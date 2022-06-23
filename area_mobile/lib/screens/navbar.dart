import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/home_ar.dart';
import '../providers/service_ar.dart';
import 'home.dart';
import 'services_list.dart';
import 'settings.dart';

class NavbarPage extends StatefulWidget {
  const NavbarPage({
    Key? key,
  }) : super(key: key);

  @override
  _NavbarPage createState() => _NavbarPage();
}

class _NavbarPage extends State<NavbarPage> {
  int _selectedIndex = 0;
  final List<Widget> _widgetOptions = <Widget>[
    Consumer<HomeAr>(
        builder: (BuildContext context, HomeAr itemar, Widget? child) =>
            const HomePage()),
    Consumer<Services>(
        builder: (BuildContext context, Services services, Widget? child) =>
            const ServicesPage()),
    const SettingsPage()
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: const Color.fromRGBO(195, 223, 234, 1),
        elevation: 0,
      ),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.connect_without_contact),
            label: 'Services',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: const Color.fromRGBO(70, 159, 201, 1),
        onTap: _onItemTapped,
      ),
    );
  }
}
