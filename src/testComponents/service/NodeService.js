
export default class NodeService {

    getTreeTableNodes() {
        return fetch('data/treetablenodes.json').then(res => res.json())
                .then(d => d.root);
    }

    getTreeNodes() {
        return fetch('data/treenodes.json').then(res => res.json())
                .then(d => d.root);
    }
    getTableData(page, size) {
        return fetch('https://api.instantwebtools.net/v1/passenger?page='+ page + '&size=' + size).then(res => res.json());
    }
}
     