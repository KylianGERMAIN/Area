// ignore_for_file: avoid_dynamic_calls

import 'dart:collection';
import 'dart:convert';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:dio/dio.dart';
import 'dart:developer';
import 'dart:convert';

class AR {
  AR(
      {required this.id,
      required this.title,
      required this.actionService,
      required this.actionElement,
      required this.inputAction,
      required this.reactionService,
      required this.reactionElement,
      required this.inputReaction});

  String id;
  String title;
  String actionService;
  String actionElement;
  List<String> inputAction;
  String reactionService;
  String reactionElement;
  List<String> inputReaction;
  bool activate = true;
}

class ListAR {
  ListAR({
    required this.title,
    required this.element,
    required this.input,
  });

  String title;
  List<String> element;
  List<List<String>> input;
}

class HomeAr extends ChangeNotifier {
  late List<AR> _ar = <AR>[];
  late String tokenGitHub = "";
  late String tokenDiscord = "";
  late String tokenSpotify = "";
  late String tokenBattleNet = "";

  void setToken(String newToken, String title) {
    if (title == 'Discord') {
      tokenDiscord = newToken;
    } else if (title == 'Github') {
      tokenGitHub = newToken;
    } else if (title == 'Spotify') {
      tokenSpotify = newToken;
    } else if (title == 'BattleNet') {
      tokenBattleNet = newToken;
    }
    print(title);
    print(newToken);

  }

  String get GettokenGitHub => tokenGitHub;
  String get GettokenDiscord => tokenDiscord;
  String get GettokenSpotify => tokenSpotify;
  String get GettokenBattleNet => tokenBattleNet;

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

  Future<void> setupAR() async {
    final User tokenResult = FirebaseAuth.instance.currentUser!;
    final String idToken = await tokenResult.getIdToken();
    late dynamic dataAreaa;
    _ar = [];
    await httpRequest(
            url: '${dotenv.env['FLUTTER_APP_GET_SERVICE']}',
            data: <String, dynamic>{},
            head: <String, dynamic>{
              'tokenid': 'Bearer $idToken',
            },
            method: 'GET')
        .then((Response<dynamic> value) {
      dataAreaa = value.data;
    });
    for (int i = 0; i != dataAreaa.length; i++) {
      late List<String> list3 = [];
      late List<String> list = [];

      String str = jsonEncode(dataAreaa[i]['inputAction']);
      List<String> words = str.split(',');
      for (int j = 0; j != words.length; j++) {
        String start = words[j].substring(0, words[j].indexOf(':'));

        if (start.contains('token') ||
            start.contains('hook_id') ||
            start.contains('object')) {
          break;
        }
        words[j] =
            words[j].substring(words[j].indexOf(':') + 1, words[j].length);
        words[j] = words[j].replaceAll(RegExp('"'), '');
        words[j] = words[j].replaceAll(RegExp('}'), '');
        words[j] = words[j].replaceAll(RegExp(']'), '');
        list.add(words[j]);
      }
      String strr = jsonEncode(dataAreaa[i]['inputReaction']);
      final List<String> Reaction = strr.split(',');

      for (int j = 0; j != Reaction.length; j++) {
        String start = Reaction[j].substring(0, Reaction[j].indexOf(':'));

        if (start.contains('token') ||
            start.contains('hook_id') ||
            start.contains('object')) {
          break;
        }
        Reaction[j] = Reaction[j]
            .substring(Reaction[j].indexOf(':') + 1, Reaction[j].length);
        Reaction[j] = Reaction[j].replaceAll(RegExp('"'), '');
        Reaction[j] = Reaction[j].replaceAll(RegExp('}'), '');
        Reaction[j] = Reaction[j].replaceAll(RegExp(']'), '');
        list3.add(Reaction[j]);
      }
      final AR ar = AR(
        id: dataAreaa[i]['id'] as String,
        title: dataAreaa[i]['titre'] as String,
        actionService: dataAreaa[i]['actionService'] as String,
        actionElement: dataAreaa[i]['actionElement'] as String,
        inputAction: list,
        reactionService: dataAreaa[i]['reactionService'] as String,
        reactionElement: dataAreaa[i]['reactionElement'] as String,
        inputReaction: list3,
      );

      _ar.add(ar);
    }
  }

  UnmodifiableListView<AR> get ar => UnmodifiableListView<AR>(_ar);

  List<String> listActionElementActuel = <String>[];
  List<ListAR> listActionServiceElement = <ListAR>[];
  List<String> listReactionElementActuel = <String>[];
  List<ListAR> listReactionServiceElement = <ListAR>[];
  String tempActionService = '';
  String tempActionElement = '';
  String tempReactionService = '';
  String tempReactionElement = '';

  String get getTempActionService => tempActionService;
  String get getTempActionElement => tempActionElement;
  String get getTempReactionService => tempReactionService;
  String get getTempReactionElement => tempReactionElement;

  List<String> get actionElementActual => listActionElementActuel;
  List<String> get reactionElementActual => listReactionElementActuel;

  List<String> get actionServiceTitle {
    final List<String> titleList = <String>[];
    for (int i = 0; i < listActionServiceElement.length; i++) {
      titleList.add(listActionServiceElement[i].title);
    }
    return titleList;
  } // return get all action service title

  List<ListAR> get getlistActionServiceElement => listActionServiceElement;
  List<ListAR> get getlistReactionServiceElement => listReactionServiceElement;

  List<String> get reactionServiceTitle {
    final List<String> titleList = <String>[];
    for (int i = 0; i < listReactionServiceElement.length; i++) {
      titleList.add(listReactionServiceElement[i].title);
    }
    return titleList;
  } // return get all action service title

  void setterparse(
      dynamic data, List<ListAR> list, String str, List<String> Statustlb) {
    late String _title = 'None';
    late List<String> _element = <String>['None'];
    late List<List<String>> _placeholderList = <List<String>>[<String>[]];

    list.add(ListAR(title: _title, element: _element, input: _placeholderList));
    for (int j = 0; j != data.length; j++) {
      for (int i = 0; i != Statustlb.length; i++) {
        if (Statustlb[i] == data[j]['service']) {
          j++;
        }
      }
      _title = data[j]['service'] as String;
      _placeholderList = <List<String>>[];
      _element = <String>['None'];
      if (str == 'actions') {
        for (int i = 0; i != data[j]['actions'].length; i++) {
          _element.add(data[j]['actions'][i]['name'] as String);
          final List<String> _placeholder = <String>[];
          for (int k = 0; k != data[j]['actions'][i]['inputs'].length; k++) {
            if (data[j]['actions'][i]['inputs'][k]['name'] != null) {
              _placeholder
                  .add(data[j]['actions'][i]['inputs'][k]['name'] as String);
            } else {
              _placeholder.add('');
            }
          }
          _placeholderList.add(_placeholder);
        }
      } else {
        for (int i = 0; i != data[j]['reactions'].length; i++) {
          _element.add(data[j]['reactions'][i]['name'] as String);
          final List<String> _placeholder = <String>[];
          for (int k = 0; k != data[j]['reactions'][i]['inputs'].length; k++) {
            if (data[j]['reactions'][i]['inputs'][k]['name'] != null) {
              _placeholder
                  .add(data[j]['reactions'][i]['inputs'][k]['name'] as String);
            } else {
              _placeholder.add('');
            }
          }
          _placeholderList.add(_placeholder);
        }
      }

      list.add(
          ListAR(title: _title, element: _element, input: _placeholderList));
    }
  }

  Future<void> setter(String actionService, String actionElement,
      String reactionService, String reactionElement) async {
    late dynamic dataAction;
    late dynamic dataReaction;
    final User tokenResult = FirebaseAuth.instance.currentUser!;
    final String idToken = await tokenResult.getIdToken();
    late dynamic dataList;
    late List<String> Statustlb = [];
    await httpRequest(
            url: '${dotenv.env['FLUTTER_APP_GET_ALL_SERVICE']}',
            data: <String, dynamic>{},
            method: 'GET')
        .then((Response<dynamic> value) {
      dataAction = value.data;
      dataReaction = value.data;
    });
    await httpRequest(
            url: '${dotenv.env['FLUTTER_APP_GET_STATUS_LINK']}',
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
      print(dataList);

      if (battleNet['connected'] == false) {
        Statustlb.add("BattleNet");
      }
      if (github['connected'] == false) {
        Statustlb.add("GitHub");
      }
      if (spotify['connected'] == false) {
        Statustlb.add("Spotify");
      }
    });
    listActionServiceElement = <ListAR>[];
    setterparse(dataAction, listActionServiceElement, 'actions', Statustlb);
    tempActionService = actionService;
    tempActionElement = actionElement;
    listReactionServiceElement = <ListAR>[];
    setterparse(
        dataReaction, listReactionServiceElement, 'reactions', Statustlb);
    tempReactionService = reactionService;
    tempReactionElement = reactionElement;
  } // setter from import

  String selectimg(String value) {
    if (value == 'Github')
      return 'https://cdn-icons-png.flaticon.com/512/25/25231.png';
    else if (value == 'Mail')
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Circle-icons-mail.svg/512px-Circle-icons-mail.svg.png';
    return 'https://upload.wikimedia.org/wikipedia/commons/9/9a/512x512_Dissolve_Noise_Texture.png';
  } // export url img

  void reset() {
    listActionElementActuel = listActionServiceElement[0].element;
    listReactionElementActuel = listReactionServiceElement[0].element;
    tempActionService = 'None';
    tempActionElement = 'None';
    tempReactionService = 'None';
    tempReactionElement = 'None';
  } // reset all

  Future<void> add(
    String _id,
    String _title,
    String _actionService,
    String _actionElement,
    List<TextEditingController> _inputAction,
    String _reactionService,
    String _reactionElement,
    List<TextEditingController> _inputReaction,
  ) async {
    final List<String> _inputActionList = <String>[];
    final List<String> _inputReactionList = <String>[];
    for (int i = 0; i != _inputAction.length; i++) {
      _inputActionList.add(_inputAction[i].text);
    }
    for (int i = 0; i != _inputReaction.length; i++) {
      _inputReactionList.add(_inputReaction[i].text);
    }

    Map<String, Object> action = {'service': '', 'actionName': '', 'data': {}};
    Map<String, Object> reaction = {
      'service': '',
      'reactionName': '',
      'data': {}
    };

    Map numMap = Map();
    Map numMap11 = Map();
    List<String> list = [];

    for (int i = 0; i != getlistActionServiceElement.length; i++) {
      if (_actionService == getlistActionServiceElement[i].title) {
        for (int y = 0;
            y != getlistActionServiceElement[i].element.length;
            y++) {
          if (_actionElement == getlistActionServiceElement[i].element[y] &&
              getlistActionServiceElement[i].element[y] != 'None') {
            list = getlistActionServiceElement[i].input[y - 1];
          }
        }
      }
    }
    for (int i = 0; i != _inputAction.length; i++) {
      if (_inputAction[i].text != '') {
        numMap[list[i]] = _inputAction[i].text;
      }
    }

    action['actionName'] = _actionElement;
    if (_actionService == "Discord") {
      numMap["token"] = GettokenDiscord;
    } else if (_actionService == "GitHub") {
      numMap["token"] = GettokenGitHub;
      numMap["events"] = _actionElement;
      action['actionName'] = "push";
    }

    list = [];
    for (int i = 0; i != getlistReactionServiceElement.length; i++) {
      if (_reactionService == getlistReactionServiceElement[i].title) {
        for (int y = 0;
            y != getlistReactionServiceElement[i].element.length;
            y++) {
          if (_reactionElement == getlistReactionServiceElement[i].element[y] &&
              getlistReactionServiceElement[i].element[y] != 'None') {
            list = getlistReactionServiceElement[i].input[y - 1];
          }
        }
      }
    }
    for (int i = 0; i != _inputReaction.length; i++) {
      if (_inputReaction[i].text != '') {
        numMap11[list[i]] = _inputReaction[i].text;
      }
    }
    reaction['reactionName'] = _reactionElement;
    if (_reactionService == "Discord") {
      numMap11["token"] = GettokenDiscord;
    } else if (_reactionService == "GitHub") {
      numMap11["token"] = GettokenGitHub;
      numMap11["events"] = _reactionElement;
      reaction['reactionName'] = "push";
    }

    action['service'] = _actionService;
    action['data'] = numMap;
    reaction['service'] = _reactionService;
    reaction['data'] = numMap11;

    Map<String, dynamic> lol = {
      "action": action,
      "reaction": reaction,
      'title': _title
    };
    print(lol);
    // DATA TO CREATE ACTION REACTION

    final User tokenResult = FirebaseAuth.instance.currentUser!;
    final String idToken = await tokenResult.getIdToken();
    var id = "";
    await httpRequest(
            url: '${dotenv.env['FLUTTER_APP_CREATE_SERVICE']}',
            data: <String, dynamic>{
              'action': lol['action'],
              'reaction': lol['reaction'],
              'title': lol['title']
            },
            head: <String, dynamic>{
              'tokenid': 'Bearer $idToken',
            },
            method: 'POST')
        .then((Response<dynamic> value) {
      id = value.data['id'] as String;
    });

    _ar.add(AR(
        id: id,
        title: _title,
        actionService: _actionService,
        actionElement: _actionElement,
        inputAction: _inputActionList,
        reactionService: _reactionService,
        reactionElement: _reactionElement,
        inputReaction: _inputReactionList));
    notifyListeners();
  } // add ar

  void changeActionElementList(bool init) {
    for (int j = 0; j < listActionServiceElement.length; j++) {
      if (tempActionService == listActionServiceElement[j].title) {
        listActionElementActuel = listActionServiceElement[j].element;
        if (init) {
          tempActionElement = listActionServiceElement[j].element[0];
        }
      }
    }
  } // change value of action second

  void changeReactionElementList(bool init) {
    for (int j = 0; j < listReactionServiceElement.length; j++) {
      if (tempReactionService == listReactionServiceElement[j].title) {
        listReactionElementActuel = listReactionServiceElement[j].element;
        if (init) {
          tempReactionElement = listReactionServiceElement[j].element[0];
        }
      }
    }
  } // change value of reation second

  void changeActionElement(String? value) {
    tempActionElement = value!;
    notifyListeners();
  }
  // change value of service action element

  void changeReactionElement(String? value) {
    tempReactionElement = value!;
    notifyListeners();
  }
  // change value of service reaction element

  void changeServiceAction(String? value) {
    tempActionService = value!;
    notifyListeners();
  }
  // change value of service action

  void changeServiceReaction(String? value) {
    tempReactionService = value!;
    notifyListeners();
  }
  // change value of service reaction element

  void status(String id) {
    for (int i = 0; i < _ar.length; i++) {
      if (id == _ar[i].id) {
        _ar[i].activate = !_ar[i].activate;
      }
    }
    notifyListeners();
  }
  // update status (activate/desactivate)

  void update(
    String id,
    String title,
    String _actionService,
    String _actionElement,
    List<TextEditingController> _inputAction,
    String _reactionService,
    String _reactionElement,
    List<TextEditingController> _inputReaction,
  ) {
    final List<String> _inputActionList = <String>[];
    final List<String> _inputReactionList = <String>[];
    for (int i = 0; i != _inputAction.length; i++) {
      _inputActionList.add(_inputAction[i].text);
    }
    for (int i = 0; i != _inputReaction.length; i++) {
      _inputReactionList.add(_inputReaction[i].text);
    }

    for (int i = 0; i < _ar.length; i++) {
      if (id == _ar[i].id) {
        _ar[i].title = title;
        _ar[i].actionService = _actionService;
        _ar[i].actionElement = _actionElement;
        _ar[i].inputAction = _inputActionList;
        _ar[i].reactionService = _reactionService;
        _ar[i].reactionElement = _reactionElement;
        _ar[i].inputReaction = _inputReactionList;
      }
    }
    notifyListeners();
  }
  // update new title of ar

  void remove(String id) async {
    final User tokenResult = FirebaseAuth.instance.currentUser!;
    final String idToken = await tokenResult.getIdToken();

    await httpRequest(
        url: '${dotenv.env['FLUTTER_APP_REMOVE_SERVICE']}',
        data: <String, dynamic>{'id': id},
        head: <String, dynamic>{'tokenid': 'Bearer $idToken'},
        method: 'DELETE');
    _ar.removeWhere((AR element) => element.id == id);
    notifyListeners();
  }
  // remove ar
}
