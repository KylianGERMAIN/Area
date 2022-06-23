import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

import 'home_ar.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'dart:collection';
import 'dart:convert';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'dart:developer';
import 'dart:convert';

class Service {
  Service({required this.title, required this.url, required this.infoOauth});

  String title;
  String url;
  OauthRequest infoOauth;
}

enum Status { Connect, Disconnect, Error }

class Services extends ChangeNotifier {
  late List<Service> services = [];

  List<Service> get getServices => services;

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
      print(e);
      rethrow;
    }
  }

  final OauthRequest discordRequest = OauthRequest(
      url: 'https://discord.com/api/oauth2/authorize',
      urlToken: 'https://discord.com/api/oauth2/token',
      clientId: '947476450817224724',
      clientSecret: 'n3IjhA_KviCZvlKRp176K0JH9GDTD56F',
      grant_type: 'authorization_code',
      redirect_uri: '${dotenv.env['FLUTTER_APP_REDIRECT_URI']}',
      scope: 'identify',
      status: Status.Connect);
  final OauthRequest githubRequest = OauthRequest(
      url: 'https://github.com/login/oauth/authorize',
      urlToken: 'https://area-epitech2.herokuapp.com/auth/getGitHubAccessToken',
      clientId: '${dotenv.env['FLUTTER_APP_GITHUB_CLIENT_ID']}',
      clientSecret: '${dotenv.env['FLUTTER_APP_GITHUB_CLIENT_SEC']}',
      grant_type: '',
      redirect_uri: '${dotenv.env['FLUTTER_APP_REDIRECT_URI']}',
      scope: 'repo',
      status: Status.Disconnect);
  final OauthRequest spotifyRequest = OauthRequest(
      url: 'https://accounts.spotify.com/authorize',
      urlToken:
          'https://area-epitech2.herokuapp.com/auth/getSpotifyAccessToken',
      clientId: '${dotenv.env['FLUTTER_APP_SPOTIFY_CLIENT_ID']}',
      clientSecret: '',
      grant_type: 'authorization_code',
      redirect_uri: '${dotenv.env['FLUTTER_APP_REDIRECT_URI']}',
      scope: '',
      status: Status.Disconnect);
  final OauthRequest battleNetRequest = OauthRequest(
      url: 'https://eu.battle.net/oauth/authorize',
      urlToken:
          'https://area-epitech2.herokuapp.com/auth/getBattleNetAccessToken',
      clientId: '${dotenv.env['FLUTTER_APP_BATTLENET_CLIENT_ID']}',
      clientSecret: '${dotenv.env['FLUTTER_APP_BATTLENET_CLIENT_SEC']}',
      grant_type: 'authorization_code',
      redirect_uri: '${dotenv.env['FLUTTER_APP_REDIRECT_URI']}',
      scope: 'wow.profile',
      status: Status.Disconnect);

  Future<void> setupServices(HomeAr home) async {
    services = <Service>[
      Service(
          title: 'Github',
          url: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
          infoOauth: githubRequest),
      Service(
          title: 'Discord',
          url:
              'https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1-1.png',
          infoOauth: discordRequest),
      Service(
        title: 'Spotify',
        url:
            'https://www.pngplay.com/wp-content/uploads/12/Spotify-Logo-Transparent-Images.png',
        infoOauth: spotifyRequest,
      ),
      Service(
        title: 'BattleNet',
        url:
            'https://icon-library.com/images/battlenet-icon/battlenet-icon-6.jpg',
        infoOauth: battleNetRequest,
      ),
    ];
    final User tokenResult = FirebaseAuth.instance.currentUser!;
    final String idToken = await tokenResult.getIdToken();
    late dynamic dataList;
    await httpRequest(
            url: 'https://area-epitech2.herokuapp.com/auth',
            data: <String, dynamic>{},
            head: <String, dynamic>{
              'tokenid': 'Bearer $idToken',
            },
            method: 'GET')
        .then((Response<dynamic> value) {
      final data = value.data;
      final String str = jsonEncode(data['services']);
      dataList = jsonDecode(str);
      final battleNet = dataList['battleNet'];
      final github = dataList['github'];
      final spotify = dataList['spotify'];

      // print(dataList);
      if (battleNet['connected'] == true) {
        home.setToken(battleNet['token'] as String, 'BattleNet');
        services[3].infoOauth.status = Status.Connect;
      }
      if (github['connected'] == true) {
        home.setToken(github['token'] as String, 'GitHub');
        services[0].infoOauth.status = Status.Connect;
      }
      if (spotify['connected'] == true) {
        home.setToken(spotify['token'] as String, 'Spotify');
        services[2].infoOauth.status = Status.Connect;
      }
    });
  }
}

//   void SyncStatusService() async {
//     final User tokenResult = FirebaseAuth.instance.currentUser!;
//     final String idToken = await tokenResult.getIdToken();
//     late dynamic dataList;
//     await httpRequest(
//             url: 'https://area-epitech2.herokuapp.com/auth',
//             data: <String, dynamic>{},
//             head: <String, dynamic>{
//               'tokenid': 'Bearer $idToken',
//             },
//             method: 'GET')
//         .then((Response<dynamic> value) {
//       final data = value.data;
//       final String str = jsonEncode(data['services']);
//       dataList = jsonDecode(str);
//       final battleNet = dataList['battleNet'];
//       final github = dataList['github'];
//       final spotify = dataList['spotify'];

//       print(dataList);
//       if (battleNet['connected'] == true) {
//         services[3].infoOauth.status = Status.Connect;
//       }
//       if (github['connected'] == true) {
//         services[0].infoOauth.status = Status.Connect;
//       }
//       if (spotify['connected'] == true) {
//         services[2].infoOauth.status = Status.Connect;
//       }
//     });
//   }
// }

class OauthRequest {
  String url;
  String urlToken;
  String clientId;
  String clientSecret;
  String? code;
  String grant_type;
  String redirect_uri;
  String scope;
  Map<String, String>? header;
  Status status;

  OauthRequest(
      {required this.url,
      required this.urlToken,
      required this.clientId,
      required this.clientSecret,
      this.code,
      required this.grant_type,
      required this.redirect_uri,
      required this.scope,
      this.header,
      required this.status});
}
