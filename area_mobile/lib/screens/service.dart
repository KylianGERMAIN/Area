import 'package:flutter/material.dart';
import '../providers/service_ar.dart';
import 'web_view.dart';

class PageService extends StatefulWidget {
  PageService(
      {Key? key,
      required this.title,
      required this.picUrl,
      required this.description,
      required this.actualOauth})
      : super(key: key);
  final String title;
  final String picUrl;
  final String description;
  OauthRequest actualOauth;

  @override
  _Service createState() => _Service();
}

class _Service extends State<PageService> {
  late OauthRequest actualOauth;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              Container(
                padding: const EdgeInsets.all(20.0),
                height: MediaQuery.of(context).size.height * 0.190,
                child: Image.network(widget.picUrl),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    widget.title,
                    style: const TextStyle(color: Colors.blue, fontSize: 20),
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height * 0.02,
                  ),
                  SizedBox(
                      height: MediaQuery.of(context).size.height * 0.04,
                      width: MediaQuery.of(context).size.width * 0.5,
                      child: ElevatedButton(
                          onPressed: () {
                            Navigator.of(context).push(MaterialPageRoute<void>(
                                builder: (BuildContext context) => WebViewAuth(
                                    title: widget.title,
                                    request: widget.actualOauth)));
                          },
                          child: const Text('Login in'))),
                ],
              )
            ],
          ),
          Container(
            padding: const EdgeInsets.only(left: 20, right: 20),
            child: Text(
              widget.description,
              textAlign: TextAlign.left,
              style: const TextStyle(color: Colors.blue, fontSize: 20),
            ),
          ),
        ],
      ),
    );
  }
}
