import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';

import '../providers/home_ar.dart';

class EditAR extends StatefulWidget {
  const EditAR({Key? key, required this.index}) : super(key: key);

  final int index;

  @override
  _EditAR createState() => _EditAR();
}

class _EditAR extends State<EditAR> {
  late TextEditingController controller = TextEditingController();

  late List<TextEditingController> controllerInputActionTbl =
      List.generate(4, (i) => TextEditingController());
  late List<TextEditingController> controllerInputReactionTbl =
      List.generate(4, (i) => TextEditingController());
  bool edit = false;
  bool load = false;

  @override
  void initState() {
    final HomeAr homear = Provider.of<HomeAr>(context, listen: false);
    if (widget.index != -1) {
      WidgetsBinding.instance?.addPostFrameCallback((_) async {
        await homear.setter(
            homear.ar[widget.index].actionService,
            homear.ar[widget.index].actionElement,
            homear.ar[widget.index].reactionService,
            homear.ar[widget.index].reactionElement);
        edit = true;
        controller.text = homear.ar[widget.index].title;

        for (int i = 0; i != homear.ar[widget.index].inputAction.length; i++) {
          controllerInputActionTbl[i].text =
              homear.ar[widget.index].inputAction[i];
        }
        for (int i = 0;
            i != homear.ar[widget.index].inputReaction.length;
            i++) {
          controllerInputReactionTbl[i].text =
              homear.ar[widget.index].inputReaction[i];
        }

        homear.changeActionElementList(false);
        homear.changeReactionElementList(false);

        setState(() {
          load = true;
        });
      });
    } else {
      WidgetsBinding.instance?.addPostFrameCallback((_) async {
        await homear.setter('', '', '', '');
        homear.reset();
        setState(() {
          load = true;
        });
      });
    }
    super.initState();
  }

  Widget delete(BuildContext context, HomeAr itemar) {
    if (widget.index != -1) {
      return Padding(
          padding: const EdgeInsets.all(10),
          child: SizedBox(
              height: 50,
              width: 120,
              child: TextButton.icon(
                  icon: const Icon(Icons.delete_forever,
                      color: Colors.white, size: 30),
                  label: const Text('Delete',
                      style: TextStyle(color: Colors.white, fontSize: 20)),
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(
                      const Color.fromRGBO(214, 83, 10, 1),
                    ),
                  ),
                  onPressed: () {
                    itemar.remove(itemar.ar[widget.index].id);
                    Navigator.of(context).pop();
                  })));
    }
    return Container();
  }

  Widget dropdown(
    String title,
    double paddingBottom,
    Color backgroundColor,
    List<String> items,
    HomeAr itemar,
    String index,
    String value,
  ) {
    return Padding(
        padding: EdgeInsets.only(bottom: paddingBottom),
        child: Column(children: <Widget>[
          Align(
            alignment: Alignment.centerLeft,
            child: Text(title,
                style: const TextStyle(
                    color: Color.fromRGBO(88, 82, 82, 1), fontSize: 15)),
          ),
          Container(
            width: MediaQuery.of(context).size.width * 1,
            padding: const EdgeInsets.only(
              left: 10.0,
            ),
            decoration: BoxDecoration(
                color: backgroundColor,
                borderRadius: BorderRadius.circular(10)),
            child: DropdownButton<String>(
              dropdownColor: backgroundColor,
              borderRadius: BorderRadius.circular(10),
              isExpanded: true,
              elevation: 0,
              iconEnabledColor: Colors.white,
              value: value,
              onChanged: (String? newValue) {
                if (index == '0') {
                  itemar.changeServiceAction(newValue);
                  itemar.changeActionElementList(true);
                } else if (index == '1') {
                  itemar.changeActionElement(newValue);
                } else if (index == '2') {
                  itemar.changeServiceReaction(newValue);
                  itemar.changeReactionElementList(true);
                } else if (index == '3') {
                  itemar.changeReactionElement(newValue);
                }
              },
              items: items.map((String items) {
                return DropdownMenuItem<String>(
                  value: items,
                  child: Container(
                      color: backgroundColor,
                      child: SizedBox(
                        child: Text(items,
                            style: const TextStyle(color: Colors.white)),
                      )),
                );
              }).toList(),
              icon: const Icon(Icons.arrow_drop_down),
              iconSize: 42,
              underline: const SizedBox(),
            ),
          )
        ]));
  }

  List<Widget> gestionInput(
      HomeAr itemar,
      Color color,
      List<ListAR> get,
      String _getTempService,
      String _getTempElement,
      List<TextEditingController> _controllerInputTbl) {
    List<String> nb = <String>[];
    List<Widget> input = <Widget>[];
    for (int i = 0; i != get.length; i++) {
      if (_getTempService == get[i].title) {
        for (int y = 0; y != get[i].element.length; y++) {
          if (_getTempElement == get[i].element[y] &&
              get[i].element[y] != 'None') {
            nb = get[i].input[y - 1];
          }
        }
      }
    }

    for (int l = 0; l != nb.length; l++) {
      if (l + 1 == nb.length) {
        input.add(inputButton(nb[l], nb[l], color, _controllerInputTbl[l], 30));
      } else {
        input.add(inputButton(nb[l], nb[l], color, _controllerInputTbl[l], 10));
      }
    }

    return input;
  }

  Widget inputButton(String nameInput, String _hintText, Color color,
      TextEditingController controller, double padding) {
    return Padding(
        padding: EdgeInsets.only(bottom: padding),
        child: Column(
          children: <Widget>[
            Align(
              alignment: Alignment.centerLeft,
              child: Text(nameInput,
                  style: const TextStyle(
                      color: Color.fromRGBO(88, 82, 82, 1), fontSize: 15)),
            ),
            Container(
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: TextField(
                  controller: controller,
                  style: const TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    hintText: _hintText,
                    hintStyle: const TextStyle(color: Colors.white),
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.all(10),
                  ),
                )),
          ],
        ));
  }

  @override
  Widget build(BuildContext context) {
    final HomeAr homear = Provider.of<HomeAr>(context, listen: true);
    return Consumer<HomeAr>(
        builder: (BuildContext context, HomeAr itemar, Widget? child) =>
            Scaffold(
                backgroundColor: Colors.white,
                appBar: AppBar(
                  backgroundColor: const Color.fromRGBO(195, 223, 234, 1),
                  elevation: 0,
                ),
                body: LayoutBuilder(
                    builder: (BuildContext context, BoxConstraints constaints) {
                  if (load == true) {
                    return SingleChildScrollView(
                        child: Column(children: <Widget>[
                      Padding(
                          padding: const EdgeInsets.only(
                              right: 20.0, left: 20.0, bottom: 20.0, top: 20.0),
                          child: Container(
                              padding: const EdgeInsets.all(20.0),
                              decoration: const BoxDecoration(
                                color: Color.fromRGBO(195, 223, 234, 1),
                                borderRadius: BorderRadius.all(
                                  Radius.circular(10),
                                ),
                              ),
                              child: Column(children: <Widget>[
                                inputButton(
                                    'Your title',
                                    'Enter a title',
                                    const Color.fromRGBO(70, 159, 201, 1),
                                    controller,
                                    30),
                                dropdown(
                                  'Your action service',
                                  10,
                                  const Color.fromRGBO(70, 159, 201, 1),
                                  homear.actionServiceTitle,
                                  itemar,
                                  '0',
                                  itemar.getTempActionService,
                                ),
                                dropdown(
                                    'Your action',
                                    10,
                                    const Color.fromRGBO(70, 159, 201, 1),
                                    homear.actionElementActual,
                                    itemar,
                                    '1',
                                    itemar.getTempActionElement),
                                Column(
                                    children: gestionInput(
                                        itemar,
                                        const Color.fromRGBO(70, 159, 201, 1),
                                        itemar.getlistActionServiceElement,
                                        itemar.getTempActionService,
                                        itemar.getTempActionElement,
                                        controllerInputActionTbl)),
                                dropdown(
                                    'Your reaction service',
                                    10,
                                    const Color.fromRGBO(124, 187, 218, 1),
                                    homear.reactionServiceTitle,
                                    itemar,
                                    '2',
                                    itemar.getTempReactionService),
                                dropdown(
                                    'Your  reaction',
                                    10,
                                    const Color.fromRGBO(124, 187, 218, 1),
                                    homear.reactionElementActual,
                                    itemar,
                                    '3',
                                    itemar.getTempReactionElement),
                                Column(
                                    children: gestionInput(
                                        itemar,
                                        const Color.fromRGBO(124, 187, 218, 1),
                                        itemar.getlistReactionServiceElement,
                                        itemar.getTempReactionService,
                                        itemar.getTempReactionElement,
                                        controllerInputReactionTbl)),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    Padding(
                                        padding: const EdgeInsets.all(10),
                                        child: SizedBox(
                                            height: 50,
                                            width: 120,
                                            child: TextButton.icon(
                                                icon: const Icon(Icons.add,
                                                    color: Colors.white,
                                                    size: 30),
                                                label: const Text('Add',
                                                    style: TextStyle(
                                                        color: Colors.white,
                                                        fontSize: 20)),
                                                style: ButtonStyle(
                                                  backgroundColor:
                                                      MaterialStateProperty.all<
                                                          Color>(
                                                    const Color.fromRGBO(
                                                        126, 194, 125, 1),
                                                  ),
                                                ),
                                                onPressed: () {
                                                  if (edit == false) {
                                                    const Uuid uuid = Uuid();
                                                    itemar.add(
                                                        uuid.v1(),
                                                        controller.text,
                                                        itemar
                                                            .getTempActionService,
                                                        itemar
                                                            .tempActionElement,
                                                        controllerInputActionTbl,
                                                        itemar
                                                            .tempReactionService,
                                                        itemar
                                                            .tempReactionElement,
                                                        controllerInputReactionTbl);
                                                    Navigator.of(context).pop();
                                                  } else {
                                                    itemar.update(
                                                        itemar.ar[widget.index]
                                                            .id,
                                                        controller.text,
                                                        itemar
                                                            .getTempActionService,
                                                        itemar
                                                            .tempActionElement,
                                                        controllerInputActionTbl,
                                                        itemar
                                                            .tempReactionService,
                                                        itemar
                                                            .tempReactionElement,
                                                        controllerInputReactionTbl);
                                                    Navigator.of(context).pop();
                                                  }
                                                }))),
                                    delete(context, itemar),
                                  ],
                                )
                              ]))),
                    ]));
                  }
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                })));
  }
}
