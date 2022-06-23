import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:google_sign_in/google_sign_in.dart';

import 'navbar.dart';
class MyAuthentication extends StatefulWidget {
  const MyAuthentication({Key? key}) : super(key: key);

  @override
  _MyAuthenticationState createState() => _MyAuthenticationState();
}

class _MyAuthenticationState extends State<MyAuthentication> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  late TextEditingController emailController = TextEditingController();
  late TextEditingController passwordController = TextEditingController();
  late TextEditingController nameController = TextEditingController();

  bool status = true;
  String sign = 'SIGN IN';
  String signMini = 'Sign up';
  String account = 'If you have no account,';
  bool showError = true;
  String? errorString = '';

  @override
  void initState() {
    stayconnect();
    super.initState();
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    nameController.dispose();
    super.dispose();
  }

  Future<void> stayconnect() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var status = prefs.getBool('isLoggedIn') ?? false;
    if (status == true) {
      Navigator.of(context).pushReplacement(MaterialPageRoute<void>(
          builder: (BuildContext context) => const NavbarPage()));
    }
  }

  Future<Response<dynamic>> httpRequest(
      {required String url,
      dynamic data,
      String method = 'GET',
      Map<String, dynamic>? head}) async {
    try {
      final Response<dynamic> response = await Dio().request(url,
          data: data, options: Options(method: method, headers: head));
      return response;
    } on DioError catch (e) {
      rethrow;
    }
  }

  Future<void> signInWithFacebook() async {
    final LoginResult loginResult = await FacebookAuth.instance.login();
    final OAuthCredential facebookAuthCredential =
        FacebookAuthProvider.credential((loginResult.accessToken?.token)!);

    FirebaseAuth.instance
        .signInWithCredential(facebookAuthCredential)
        .then((UserCredential value) async {
      final User tokenResult = FirebaseAuth.instance.currentUser!;
      final String idToken = await tokenResult.getIdToken();
      httpRequest(
        url: '${dotenv.env['FLUTTER_APP_SIGN_USER_PROVIDER']}',
        data: <String, dynamic>{'user': '${value.user}'},
        method: 'POST',
        head: <String, dynamic>{
          'tokenid': 'Bearer $idToken',
        },
      ).then((Response<dynamic> value) {
        Navigator.of(context).pushReplacement(MaterialPageRoute<void>(
            builder: (BuildContext context) => const NavbarPage()));
      }).catchError((dynamic onError) => {
            setState(() {
              errorString = onError as String;
            })
          });
    });
  }

  Future<void> signInWithGoogle() async {
    // Trigger the authentication flow
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

    // Obtain the auth details from the request
    final GoogleSignInAuthentication? googleAuth =
        await googleUser?.authentication;

    // Create a new credential
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );

    // Once signed in, return the UserCredential
    await FirebaseAuth.instance
        .signInWithCredential(credential)
        .then((UserCredential value) async {
      final User tokenResult = FirebaseAuth.instance.currentUser!;
      final String idToken = await tokenResult.getIdToken();
      httpRequest(
        url: '${dotenv.env['FLUTTER_APP_SIGN_USER_PROVIDER']}',
        data: <String, dynamic>{'user': '${value.user}'},
        method: 'POST',
        head: <String, dynamic>{
          'tokenid': 'Bearer $idToken',
        },
      ).then((Response<dynamic> value) {
        Navigator.of(context).pushReplacement(MaterialPageRoute<void>(
            builder: (BuildContext context) => const NavbarPage()));
      }).catchError((dynamic onError) => {
            setState(() {
              errorString = onError as String;
            })
          });
    });
  }

  Future<void> acountLog() async {
    final FirebaseAuth auth = FirebaseAuth.instance;
    if (status == false) {
      httpRequest(
              url: '${dotenv.env['FLUTTER_APP_CREATE_USER']}',
              data: <String, dynamic>{
                'email': emailController.text,
                'password': passwordController.text,
                'username': nameController.text
              },
              method: 'POST')
          .then((Response<dynamic> value) => <void>{
                setState(() {
                  errorString = value.data!['msg'] as String;
                })
              });
    } else if (status == true) {
      try {
        await auth
            .signInWithEmailAndPassword(
                email: emailController.text, password: passwordController.text)
            .then((UserCredential value) async {
          final User tokenResult = FirebaseAuth.instance.currentUser!;
          final String idToken = await tokenResult.getIdToken();
          httpRequest(
                  url: '${dotenv.env['FLUTTER_APP_SIGN_USER']}',
                  data: <String, dynamic>{},
                  head: <String, dynamic>{
                    'tokenid': 'Bearer $idToken',
                  },
                  method: 'POST')
              .then((Response<dynamic> value) {
            Navigator.of(context).pushReplacement(MaterialPageRoute<void>(
                builder: (BuildContext context) => const NavbarPage()));
          }).catchError((dynamic onError) => {
                    setState(() {
                      errorString = onError as String;
                    })
                  });
        });
      } on FirebaseAuthException catch (error) {
        setState(() {
          errorString = error.message;
        });
      }
    }
  }

  void functionStatus(bool _status) {
    setState(() {
      status = _status;
    });
    if (status == true) {
      setState(() {
        sign = 'SIGN IN';
        signMini = 'Sign up';
        account = 'If you have no account, ';
      });
    } else {
      setState(() {
        sign = 'SIGN UP';
        signMini = 'Sign in';
        account = 'Already have an account? ';
      });
    }
  }

  Widget textField(
      String name, TextEditingController controller, Icon icon, bool hide) {
    return Column(children: <Widget>[
      Align(
        alignment: Alignment.centerLeft,
        child: Text(name),
      ),
      TextField(
        controller: controller,
        obscureText: hide,
        decoration: InputDecoration(
          prefixIcon: icon,
          hintText: 'Enter a search term',
          focusedBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: Color.fromRGBO(70, 159, 201, 1)),
          ),
        ),
      ),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
        ),
        body: Padding(
            padding: const EdgeInsets.all(20.0),
            child: SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  SizedBox(
                      width: MediaQuery.of(context).size.width * 0.8,
                      height: MediaQuery.of(context).size.height * 0.2,
                      child: const Image(image: AssetImage('assets/logo.png'))),
                  SizedBox(
                      height: MediaQuery.of(context).size.height * 0.6,
                      child: Column(
                          mainAxisSize: MainAxisSize.min,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            textField(
                                'Email',
                                emailController,
                                const Icon(Icons.mail_outline,
                                    color: Colors.black),
                                false),
                            SizedBox(
                              height: MediaQuery.of(context).size.height * 0.03,
                            ),
                            textField(
                                'Password',
                                passwordController,
                                const Icon(Icons.lock_outline,
                                    color: Colors.black),
                                true),
                            SizedBox(
                              height: MediaQuery.of(context).size.height * 0.03,
                            ),
                            if (status == false)
                              textField(
                                  'Name',
                                  nameController,
                                  const Icon(Icons.person_outline,
                                      color: Colors.black),
                                  false),
                            SizedBox(
                              height: MediaQuery.of(context).size.height * 0.03,
                            ),
                            Padding(
                                padding: const EdgeInsets.only(bottom: 10),
                                child: Text(errorString!,
                                    style: const TextStyle(
                                        color: Colors.red,
                                        fontWeight: FontWeight.bold))),
                            SizedBox(
                                width: MediaQuery.of(context).size.width * 1,
                                height:
                                    MediaQuery.of(context).size.height * 0.06,
                                child: ElevatedButton(
                                  onPressed: () {
                                    acountLog();
                                  },
                                  style: ElevatedButton.styleFrom(
                                      primary:
                                          const Color.fromRGBO(70, 159, 201, 1),
                                      shape: const StadiumBorder(),
                                      textStyle: const TextStyle(
                                          fontWeight: FontWeight.bold)),
                                  child: Text(
                                    sign,
                                    style: const TextStyle(
                                        fontWeight: FontWeight.bold),
                                  ),
                                )),
                            SizedBox(
                              height: MediaQuery.of(context).size.height * 0.02,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Text(
                                  account,
                                  style: const TextStyle(
                                      color: Colors.grey, fontSize: 15),
                                ),
                                TextButton(
                                  style: TextButton.styleFrom(
                                    primary: Colors.black,
                                    textStyle: const TextStyle(fontSize: 20),
                                  ),
                                  onPressed: () {
                                    functionStatus(!status);
                                  },
                                  child: Text(signMini,
                                      style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 15)),
                                ),
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: <Widget>[
                                Ink(
                                  decoration: BoxDecoration(
                                    boxShadow: const <BoxShadow>[
                                      BoxShadow(
                                          color: Colors.black26,
                                          offset: Offset(0, 1),
                                          blurRadius: 2.0)
                                    ],
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: IconButton(
                                    icon: Image.network(
                                        'http://pngimg.com/uploads/google/google_PNG19635.png',
                                        fit: BoxFit.cover),
                                    color: Colors.white,
                                    onPressed: () {
                                      signInWithGoogle();
                                    },
                                  ),
                                ),
                                Ink(
                                  decoration: BoxDecoration(
                                    boxShadow: const <BoxShadow>[
                                      BoxShadow(
                                          color: Colors.black26,
                                          offset: Offset(0, 1),
                                          blurRadius: 2.0)
                                    ],
                                    color: Colors.blue,
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: IconButton(
                                    icon: const Icon(Icons.facebook),
                                    color: Colors.white,
                                    onPressed: () {
                                      signInWithFacebook();
                                    },
                                  ),
                                ),
                              ],
                            )
                          ])),
                ],
              ),
            )));
  }
}
