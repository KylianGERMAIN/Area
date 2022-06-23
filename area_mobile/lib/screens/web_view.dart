import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';

import '../providers/home_ar.dart';
import '../providers/service_ar.dart';

class WebViewAuth extends StatefulWidget {
  const WebViewAuth({Key? key, required this.title, required this.request})
      : super(key: key);

  final String title;
  final OauthRequest request;

  @override
  _WebViewAuth createState() => _WebViewAuth();
}

class _WebViewAuth extends State<WebViewAuth> {
  String token = '';

  Future<Response<dynamic>> httpRequest(
      {required String url,
      dynamic data,
      String method = 'POST',
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

  void callPost(HomeAr home, String name) async {
    final User tokenResult = FirebaseAuth.instance.currentUser!;
    final String idToken = await tokenResult.getIdToken();
    print(widget.request.urlToken);
    print(widget.request.code);
    print(idToken);

    await httpRequest(
            url: widget.request.urlToken,
            data: <String, dynamic>{'code': widget.request.code},
            head: <String, dynamic>{
              'tokenid': 'Bearer $idToken',
            },
            method: 'POST')
    .then((Response<dynamic> value) {
      var token = value.data;
      home.setToken(token['access_token'] as String, name);
      widget.request.status = Status.Connect;
    }).catchError((dynamic onError) => {print(onError)});

  }

  Widget build(BuildContext context) {
    final HomeAr home = Provider.of<HomeAr>(context, listen: false);
    return Scaffold(
      body: WebView(
        initialUrl:
            '${widget.request.url}?client_id=${widget.request.clientId}&redirect_uri=${widget.request.redirect_uri}&response_type=code&scope=${widget.request.scope}',
        javascriptMode: JavascriptMode.unrestricted,
        navigationDelegate: (NavigationRequest newRequest) {
          if (newRequest.url.startsWith(widget.request.redirect_uri)) {
            print(newRequest.url);
            widget.request.code = newRequest.url.substring(
                newRequest.url.lastIndexOf('=') + 1, newRequest.url.length);
            callPost(home, widget.title);
            Navigator.pop(context);
          }
          return NavigationDecision.navigate;
        },
      ),
    );
  }
}
