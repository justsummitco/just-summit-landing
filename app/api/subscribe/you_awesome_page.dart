import 'package:flutter/material.dart';
import 'package:flutter_filesundefined/index.dart';


class YouAwesomePage extends StatefulWidget {
  const YouAwesomePage({
    required this.bloc,
    super.key
    });
  static const String routeName = '/youAwesome';
  
  final YouAwesomeBloc? bloc;

  @override
  State<YouAwesomePage> createState() => _YouAwesomePageState();
}

class _YouAwesomePageState extends State<YouAwesomePage> {

  YouAwesomeBloc? _bloc;
  YouAwesomeBloc get bloc {
    // get it by DI in real code.
    _bloc ??= widget.bloc ?? YouAwesomeBloc();
    return _bloc!;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('YouAwesome'),
         actions: [
          IconButton(
            icon: const Icon(Icons.error),
            onPressed: () {
              bloc.add(ErrorYouAwesomeEvent());
            },
          ),
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              bloc.add(AddYouAwesomeEvent());
            },
          ),
          IconButton(
            icon: const Icon(Icons.clear),
            onPressed: () {
              bloc.add(ClearYouAwesomeEvent());
            },
          ),
        ],
      ),
      body: YouAwesomeScreen(bloc: bloc),
    );
  }
}
