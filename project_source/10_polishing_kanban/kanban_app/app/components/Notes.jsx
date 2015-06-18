import React from 'react';

import Editable from './Editable';
import Note from './Note';

export default class Notes extends React.Component {
  constructor(props: {
    actions: Object;
    items: Array;
    onEdit: Function;
  }) {
    super(props);
  }
  render() {
    var notes = this.props.items;

    return (
      <ul className='notes'>{notes.map((note, i) =>
        <Note onMove={this.onMoveNote.bind(this)} className='note'
          key={'note-' + note.id} actions={this.props.actions} data={note}>
          <Editable
            value={note.task}
            onEdit={this.props.onEdit.bind(this, i)} />
        </Note>
      )}</ul>
    );
  }
  onMoveNote(source, target) {
    console.log('source', source, 'target', target);

    // TODO: rethink logic (splice?)
    if(source.actions === target.actions) {
      source.actions.remove({id: source.data.id});

      target.actions.createAfter(target.data.id, source.data);
    }
    else {
      source.actions.remove({id: source.data.id});
      target.actions.remove({id: source.data.id});

      target.actions.createBefore(target.data.id, source.data);
    }
  }
}
