import React from 'react';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

class MediaItem extends React.Component { // eslint-disable-line
  render() {
    return (<ListItem
      primaryText={`${this.props.series.name} ${this.props.series.lastWatched}`}
      leftAvatar={<Avatar src={this.props.series.thumbnail} />}
    />);
  }
}
MediaItem.propTypes = {
  series: React.PropTypes.object.isRequired, // eslint-disable-line
};
export default MediaItem;
