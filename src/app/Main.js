import React from 'react';
import { blue500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import List from 'material-ui/List';
import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MediaItem from './MediaItem';
import { watching, newSeries, ignored, endOfSeason, done } from './series';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: blue500,
  },
});

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      listData: [],
    };
  }
  componentDidMount() {
    fetch('https://api.andersos.net/series.json') // eslint-disable-line
    .then(response => response.json()).then((json) => {
      this.setState({
        listData: json,
      });
    }).catch((ex) => {
      console.log('parsing failed', ex);
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Series" onLeftIconButtonTouchTap={() => {
              window.location.href = 'http://api.andersos.net'; // eslint-disable-line
            }}
          />
          <Tabs>
            <Tab label="Watching" >
              <List>
                {
        this.state.listData.filter(
          series => watching(series)).map(series => <MediaItem series={series} key={series.name} />)
      }
              </List>
            </Tab>
            <Tab label="New" >
              <List>
                {
        this.state.listData.filter(
          series => newSeries(series)).map(
            series => <MediaItem series={series} key={series.name} />)
      }
              </List>
            </Tab>
            <Tab label="End of season" >
              <List>
                {
        this.state.listData.filter(
          series => endOfSeason(series)).map(
            series => <MediaItem series={series} key={series.name} />)
      }
              </List>
            </Tab>
            <Tab label="Ignored" >
              <List>
                {
        this.state.listData.filter(
          series => ignored(series)).map(
            series => <MediaItem series={series} key={series.name} />)
      }
              </List>
            </Tab>
            <Tab label="Done" >
              <List>
                {
        this.state.listData.filter(
          series => done(series)).map(
            series => <MediaItem series={series} key={series.name} />)
      }
              </List>
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
