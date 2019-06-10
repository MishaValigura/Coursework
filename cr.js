function Node(value) {
    this.data = value;
    this.previous = null;
    this.next = null;
}

function DoublyList() {
    this._length = 0;
    this.head = null;
    this.tail = null;
}

DoublyList.prototype.add = function(value) {
    let node = new Node(value);

    if (this._length) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
    } else {
        this.head = node;
        this.tail = node;
    }

    this._length++;

    return node;
};

DoublyList.prototype.searchNodeAt = function(position) {
    let currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};

    // 1st case: wrong position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }

    // 2nd case: correct position
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }

    return currentNode;
};

DoublyList.prototype.remove = function(position) {
    let currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;

    // 1st case: wrong position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }

    // 2nd case: the first node is deleted
    if (position === 1) {
        this.head = currentNode.next;

        // 2nd case: there is a second node
        if (!this.head) {
            this.head.previous = null;
        // 2nd case: the second node does not exist
        } else {
            this.tail = null;
        }

    // 3rd case: last node removed
    } else if (position === this._length) {
        this.tail = this.tail.previous;
        this.tail.next = null;
    // 4th case: middle node removed
    } else {
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }

        beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;

        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
    }

    this._length--;

    return message.success;
};
