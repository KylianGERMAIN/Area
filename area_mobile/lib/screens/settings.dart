import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'authentification.dart';
import 'change_pass.dart';


class SettingsPage extends StatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  _SettingsPage createState() => _SettingsPage();
}

class _SettingsPage extends State<SettingsPage> {
  
  Widget oneSetting(String word) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: ElevatedButton(
        onPressed: () {
          if (word == 'Disconnect')
            Disconnect(context);
          else if (word == 'Reset password') {
            Navigator.of(context).push(MaterialPageRoute<void>(
          builder: (BuildContext context) => const ChangePass()));
          }
        },
        style: ElevatedButton.styleFrom(
          primary: const Color.fromRGBO(124, 187, 218, 1)
        ),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(word,
                  style: const TextStyle(color: Colors.white, fontSize: 18)
                ),
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(100),
                    color: Color.fromRGBO(70, 159, 201, 1),
                  ),
                  child: const Icon(
                    Icons.keyboard_arrow_right,
                    color: Colors.white,
                    size: 20.0,
                  ),
                )
              ],
            )
          ],
        ),
      )
      
    );
  }

  Widget titleSetting(String title, IconData icon, double topPad) {
    return Padding(
      padding:  EdgeInsets.only(top: topPad),
      child: Row(
        children: [
          Icon(icon,
            color: const Color.fromRGBO(70, 159, 201, 1),
            size: 25.0,
          ),
          Text(title,
            style: const TextStyle(
              color: Color.fromRGBO(70, 159, 201, 1),
              fontSize: 25.0
            ),
          ),
        ],
      ),
    );
  }
  
    @override
  void initState() {
    super.initState();

  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(30),
      child: Container(
        padding: const EdgeInsets.only(left: 20, right: 20),
        decoration: const BoxDecoration(
          color: Color.fromRGBO(195, 223, 234, 1),
          borderRadius: BorderRadius.all(Radius.circular(10))
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            titleSetting('Account', Icons.face, 10),
            oneSetting('Reset password'),
            titleSetting('Other', Icons.nature_people, 10),
            oneSetting('Disconnect'),
          ],
        ),
      )
    );
  }
}

void Disconnect(BuildContext context) {
  final FirebaseAuth auth = FirebaseAuth.instance;
  auth.signOut();
  Navigator.of(context).pushReplacement(MaterialPageRoute<void>(
            builder: (BuildContext context) => const MyAuthentication()));
}