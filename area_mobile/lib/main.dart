import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

import 'providers/home_ar.dart';
import 'providers/service_ar.dart';
import 'screens/authentification.dart';

Future<dynamic> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: '.env');
  Firebase.initializeApp();
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider<HomeAr>(create: (BuildContext context) => HomeAr()),
    ChangeNotifierProvider<Services>(
        create: (BuildContext context) => Services())
  ], child: const MyMain()));
}

class MyMain extends StatelessWidget {
  const MyMain({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer2<HomeAr, Services>(
        builder: (BuildContext context, HomeAr itemar, Services services,
                Widget? child) =>
            const MaterialApp(
              home: Scaffold(body: Center(child: MyAuthentication())),
            ));
  }
}
