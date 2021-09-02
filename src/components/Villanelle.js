import React, { Component } from "react";

// A Villanelle is a poem consisting of 6 stanzas, 5 tercets and 1 quatrain.
class Villanelle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: Array(18).fill(''),
    };
  }

  findMatchingRefrains(i) {
    // Given i, the index of the line in the poem, find a list of matching refreins indexes.
    var a = [0, 5, 11, 17];
    var b = [2, 8, 14, 18];
    if (a.includes(i)) {
      return a;
    }
    if (b.includes(i)) {
      return b;
    }
    return [i];
  }

  makeFnHandleLineChange = (i) => {
    // Given i, the index of the line in the poem, return a function that handles changes to the line.
    return (event) => {
      var lines = { ...this.state.lines }
      var matches = this.findMatchingRefrains(i)
      for (var j in matches) {
        lines[matches[j]] = event.target.value;
      }
      this.setState({ lines });
    }
  }

  renderStanza(stanzaIndex, numLinesInStanza) {
    var linesRender = []
    for (var i = 0; i < numLinesInStanza; i++) {
      // It's always 3, tercet, because only the last stanza is a quatrain.
      var lineIndex = stanzaIndex * 3 + i;

      // The rhyme scheme is ABA*5 + ABAA
      var rhymeScheme;
      if (i %3 ===0 || i %3 === 2 || i === 18) {
        rhymeScheme = 'A';
      } else {
        rhymeScheme = 'B';
      }

      linesRender.push(
        <div className="line">
          <span class="rhyme-scheme">{rhymeScheme}</span>
          <span>
            <input
              type="text"
              value={this.state.lines[lineIndex]}
              onChange={this.makeFnHandleLineChange(lineIndex)}>
            </input>
          </span>
        </div>
      );
    }
    return <div className="stanza">{linesRender}</div>;
  }

  render() {
    var stanzas = [];
    for (var i = 0; i < 6; i++) {
      if (i === 5) {
        stanzas.push(this.renderStanza(i, 4));
      } else {
        stanzas.push(this.renderStanza(i, 3));
      }
    }
    return (<div className="villanelle">{stanzas}</div>);
  }
}

export default Villanelle;