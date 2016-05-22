import React from 'react';
import {blue500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import List from 'material-ui/List';
import MediaItem from './MediaItem.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';

import { watching, newSeries, ignored, endOfSeason, done } from './series.js';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: blue500
  }
});

class Main extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      listData: []
    };
  }
  componentDidMount () {
    const _this = this;
    fetch('http://api.andersos.net/series.json')
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
          return watching(series);
        }).map((series) => <MediaItem series={series} key={series.name} />)
      }
      </List>
      <List>
      <Subheader>New</Subheader>
      {
        this.state.listData.filter((series) => {
          return newSeries(series);
        }).map((series) => <MediaItem series={series} key={series.name} />)
      }
      </List>
      <List>
      <Subheader>End of season</Subheader>
      {
        this.state.listData.filter((series) => {
          return endOfSeason(series);
        }).map((series) => <MediaItem series={series} key={series.name} />)
      }
      </List>
      <List>
      <Subheader>Ignored</Subheader>
      {
        this.state.listData.filter((series) => {
          return ignored(series);
        }).map((series) => <MediaItem series={series} key={series.name} />)
      }
      </List>
      <List>
      <Subheader>Done</Subheader>
      {
        this.state.listData.filter((series) => {
          return done(series);
        }).map((series) => <MediaItem series={series} key={series.name} />)
      }
      </List>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
