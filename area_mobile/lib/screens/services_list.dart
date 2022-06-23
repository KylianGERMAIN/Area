import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/home_ar.dart';
import '../providers/service_ar.dart';
import 'service.dart';
import 'web_view.dart';

class ServicesPage extends StatefulWidget {
  const ServicesPage({Key? key}) : super(key: key);

  @override
  _ServicesPage createState() => _ServicesPage();
}

class _ServicesPage extends State<ServicesPage> {
  bool load = false;
  Widget iconContainer(Color color, IconData icon) {
    return Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(100),
          color: color,
        ),
        padding: const EdgeInsets.all(10.0),
        child: Icon(
          icon,
          color: Colors.white,
          size: 30.0,
        ));
  }

  Widget iconStatus(Status status) {
    if (status == Status.Connect)
      return iconContainer(Colors.green, Icons.check);
    else if (status == Status.Disconnect)
      return iconContainer(Colors.red, Icons.close);
    else
      return iconContainer(Colors.orange, Icons.warning);
  }

  Widget longbutton(Service service) {
    return Padding(
        padding: const EdgeInsets.only(top: 20),
        child: Row(children: <Widget>[
          ElevatedButton(
              style: ElevatedButton.styleFrom(
                  primary: const Color.fromRGBO(124, 187, 218, 1),
                  padding: const EdgeInsets.all(10),
                  shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(
                    Radius.circular(13),
                  )),
                  elevation: 0,
                  fixedSize: Size(
                    MediaQuery.of(context).size.width * 0.95,
                    MediaQuery.of(context).size.height * 0.15,
                  )),
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute<void>(
                    builder: (BuildContext context) => WebViewAuth(
                        title: service.title, request: service.infoOauth)));
              },
              child: Row(children: <Widget>[
                Container(
                    padding: const EdgeInsets.all(10),
                    width: MediaQuery.of(context).size.width * 0.3,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: const <BoxShadow>[
                        BoxShadow(
                            color: Color.fromRGBO(124, 187, 218, 1),
                            spreadRadius: 3),
                      ],
                    ),
                    child: Image.network(service.url)),
                Container(
                    width: MediaQuery.of(context).size.width * 0.55,
                    color: const Color.fromRGBO(124, 187, 218, 1),
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text(
                            service.title,
                            style: const TextStyle(
                                color: Colors.white, fontSize: 18),
                          ),
                          Container(
                              padding: const EdgeInsets.all(10.0),
                              child: iconStatus(service.infoOauth.status))
                        ]))
              ]))
        ]));
  }

  @override
  void initState() {
    final Services service = Provider.of<Services>(context, listen: false);
    final HomeAr home = Provider.of<HomeAr>(context, listen: false);

    WidgetsBinding.instance?.addPostFrameCallback((_) async {
      await service.setupServices(home);
      setState(() {
        load = true;
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<Services>(
        builder: (BuildContext context, Services service, Widget? child) =>
            Scaffold(
                backgroundColor: Colors.white,
                body: LayoutBuilder(
                    builder: (BuildContext context, BoxConstraints constaints) {
                  if (load == true) {
                    return ListView.builder(
                        padding: const EdgeInsets.all(8),
                        itemCount: service.getServices.length,
                        itemBuilder: (BuildContext context, int index) {
                          return longbutton(service.getServices[index]);
                        });
                  } else {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }
                })));
  }
}
