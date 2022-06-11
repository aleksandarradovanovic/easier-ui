import React, { Component } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import NodeService from "./service/NodeService";

export default class TreeTableDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      expandedKeys: {},
    };
    this.nodeservice = new NodeService();
    this.toggleApplications = this.toggleApplications.bind(this);
  }

  toggleApplications() {
    let expandedKeys = { ...this.state.expandedKeys };
    if (expandedKeys["0"]) delete expandedKeys["0"];
    else expandedKeys["0"] = true;

    this.setState({ expandedKeys: expandedKeys });
  }

  componentDidMount() {
    this.nodeservice
      .getTreeTableNodes()
      .then((data) => this.setState({ nodes: data }));
  }

  render() {
    return (
      <div>
        <div className="card">
          <h5>Basic</h5>
          <TreeTable value={this.state.nodes}>
            <Column field="name" header="Name" expander></Column>
            <Column field="size" header="Size"></Column>
            <Column field="type" header="Type"></Column>
          </TreeTable>
        </div>

        <div className="card">
          <h5>Programmatic</h5>
          <Button
            onClick={this.toggleApplications}
            label="Toggle Applications"
          />
          <TreeTable
            value={this.state.nodes}
            expandedKeys={this.state.expandedKeys}
            onToggle={(e) => this.setState({ expandedKeys: e.value })}
            style={{ marginTop: ".5em" }}
          >
            <Column field="name" header="Name" expander></Column>
            <Column field="size" header="Size"></Column>
            <Column field="type" header="Type"></Column>
          </TreeTable>
        </div>
      </div>
    );
  }
}
