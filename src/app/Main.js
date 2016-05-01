import React from 'react';
import {blue500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar'; // eslint-disable-line
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // eslint-disable-line
import Avatar from 'material-ui/Avatar'; // eslint-disable-line
import List from 'material-ui/List'; // eslint-disable-line
import ListItem from 'material-ui/List/ListItem'; // eslint-disable-line
import Subheader from 'material-ui/Subheader'; // eslint-disable-line
import seasons from './seasons.js';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: blue500
  }
});

function lastInSeason(name, episode) {
  if(seasons[name]) {
    return episode === seasons[name];
  } else {
    return false
  }
}

function newSeries(lastWatched) {
  return lastWatched.slice(-2) === "00";
}

class Main extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      listData: []
    };
  }
  componentDidMount () {
    const _this = this;
    fetch('http://api.andersos.net/series.json') // eslint-disable-line
    .then((response) => {
      return response.json();
    }).then((json) => {
      _this.setState({
        listData: json
      });
    }).catch((ex) => {
      console.log('parsing failed', ex);
    });
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
      <AppBar title='Series' showMenuIconButton={false} />
      <List>
      <Subheader>Watching</Subheader>
      {
        this.state.listData.filter((series) => {
          return !lastInSeason(series.name, series.lastWatched) && !newSeries(series.lastWatched) && !series.ignored && !series.cancelled;
        }).map(
          (series) =>
          <ListItem
          primaryText={series.name + " " + series.lastWatched}
          key={series.name}
          leftAvatar={<Avatar src={series.thumbnail} />}
          />
        )
      }
      </List>
      <List>
      <Subheader>Ignored</Subheader>
      {
        this.state.listData.filter((series) => {
          return newSeries(series.lastWatched) || series.ignored;
        }).map(
          (series) =>
          <ListItem
          primaryText={series.name + " " + series.lastWatched}
          key={series.name}
          leftAvatar={<Avatar src={series.thumbnail} />}
          />
        )
      }
      </List>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
