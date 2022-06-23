import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './edit_ar.dart';
import '../providers/home_ar.dart';

class ARList extends StatelessWidget {
  const ARList({Key? key}) : super(key: key);

  Widget containerAR(
      BuildContext context, String url, String title, String ar) {
    return Container(
        decoration: BoxDecoration(
            color: const Color.fromRGBO(195, 223, 234, 1),
            borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(10),
                topRight: Radius.circular(10),
                bottomLeft: Radius.circular(10),
                bottomRight: Radius.circular(10)),
            border: Border.all(color: Colors.white, width: 3)),
        child: Row(children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(10),
            child: Column(
              children: <Widget>[Text(title), Text(ar)],
            ),
          )
        ]));
  }

  Widget bigCaseAR(BuildContext context, HomeAr itemar, int index) {
    return Column(
      children: <Widget>[
        Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Container(
                  padding: const EdgeInsets.all(10),
                  child: Padding(
                      padding: const EdgeInsets.all(4.0),
                      child: Text(itemar.ar[index].title,
                          style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold)))),
              Row(children: <Widget>[
                Switch(
                  activeTrackColor: Colors.green,
                  activeColor: Colors.white,
                  inactiveTrackColor: Colors.grey[300],
                  inactiveThumbColor: Colors.white,
                  value: itemar.ar[index].activate,
                  onChanged: (bool value) {
                    itemar.status(itemar.ar[index].id);
                  },
                ),
                IconButton(
                    icon:
                        const Icon(Icons.close, color: Colors.white, size: 30),
                    onPressed: () {
                      itemar.remove(itemar.ar[index].id);
                    })
              ])
            ]),
        Padding(
            padding: const EdgeInsets.all(10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                containerAR(
                    context,
                    itemar.selectimg(itemar.ar[index].actionService),
                    itemar.ar[index].actionService,
                    itemar.ar[index].actionElement),
                const Icon(Icons.arrow_right_alt_outlined,
                    color: Colors.white, size: 32),
                containerAR(
                    context,
                    itemar.selectimg(itemar.ar[index].reactionService),
                    itemar.ar[index].reactionService,
                    itemar.ar[index].reactionElement),
              ],
            )),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<HomeAr>(
        builder: (BuildContext context, HomeAr itemar, Widget? child) =>
            ListView.builder(
                padding: const EdgeInsets.all(8),
                shrinkWrap: true,
                itemCount: itemar.ar.length,
                itemBuilder: (BuildContext context, int index) {
                  return Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        height: MediaQuery.of(context).size.height * 0.17,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: const Color.fromRGBO(70, 159, 201, 1),
                          boxShadow: const <BoxShadow>[
                            BoxShadow(
                                color: Color.fromRGBO(195, 223, 234, 1),
                                spreadRadius: 3),
                          ],
                        ),
                        child: bigCaseAR(context, itemar, index),
                      ));
                }));
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePage createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  bool load = false;

  @override
  void initState() {
    final HomeAr homear = Provider.of<HomeAr>(context, listen: false);
    WidgetsBinding.instance?.addPostFrameCallback((_) async {
      await homear.setupAR();
      setState(() {
        load = true;
      });
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<HomeAr>(
        builder: (BuildContext context, HomeAr itemar, Widget? child) =>
            LayoutBuilder(
                builder: (BuildContext context, BoxConstraints constaints) {
              if (load == true) {
                return SizedBox(
                    child: Column(children: <Widget>[
                  const Expanded(child: ARList()),
                  Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        boxShadow: <BoxShadow>[
                          BoxShadow(
                            color: Colors.grey.withOpacity(0.5),
                            spreadRadius: 5,
                            blurRadius: 7,
                            offset: const Offset(0, 3),
                          ),
                        ],
                      ),
                      width: MediaQuery.of(context).size.width * 1,
                      child: Padding(
                        padding: const EdgeInsets.all(14),
                        child: FloatingActionButton(
                          onPressed: () {
                            Navigator.of(context).push(MaterialPageRoute<void>(
                                builder: (BuildContext context) =>
                                    Consumer<HomeAr>(
                                        builder: (BuildContext context,
                                                HomeAr itemar, Widget? child) =>
                                            const EditAR(index: -1))));
                          },
                          backgroundColor:
                              const Color.fromRGBO(195, 223, 234, 1),
                          tooltip: 'Capture Picture',
                          elevation: 5,
                          splashColor: Colors.grey,
                          child: const Icon(
                            Icons.add,
                            color: Colors.white,
                            size: 29,
                          ),
                        ),
                      ))
                ]));
              } else {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              }
            }));
  }
}
