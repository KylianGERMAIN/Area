import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

class ChangePass extends StatefulWidget {
  const ChangePass({Key? key}) : super(key: key);

  @override
  _ChangePass createState() => _ChangePass();
}

class _ChangePass extends State<ChangePass> {
  late TextEditingController emailController = TextEditingController();
  final FirebaseAuth auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromRGBO(195, 223, 234, 1),
        title: const Text('Reset Password',
            style: TextStyle(
              color: Colors.white,
              fontSize: 25.0
            ),
          ),
        ),
      body: Padding (
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(
              controller: emailController,
              decoration: const InputDecoration(
                prefixIcon: Icon(Icons.email),
                hintText: 'Enter your email',
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Color.fromRGBO(70, 159, 201, 1)),
                ),
              )
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.02,
            ),
            ElevatedButton(
              onPressed: () {
                auth.sendPasswordResetEmail(email: emailController.text);
              },
              style: ElevatedButton.styleFrom(
                  primary:
                      const Color.fromRGBO(70, 159, 201, 1),
                  shape: const StadiumBorder(),
                  textStyle: const TextStyle(
                      fontWeight: FontWeight.bold)),
              child: const Text(
                'Submit',
                style: TextStyle(
                    fontWeight: FontWeight.bold),
              ),
            )
          ],
        ),
      )
    );
  }
}
