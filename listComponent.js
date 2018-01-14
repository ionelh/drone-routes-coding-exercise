class ListComponent {
  constructor(count, wrapper, clickHandler) {
    this.wrapper = wrapper;
    this.clickHandler = clickHandler;
    this.count = count;
    this.drawList();
  }

  drawList() {
    for (let index = 0; index < this.count; index += 1) {
      const listItem = document.createElement('a');
      if (index === 0) {
        listItem.classList.add('selected');
      }
      listItem.innerHTML = `Route ${index + 1}`;
      listItem.addEventListener('click', e => {
        this.clickHandler(index);
      });
      this.wrapper.appendChild(listItem);
    }
  }

  unselectAll() {
    const listItems = this.wrapper.getElementsByTagName('a');
    for (let i = 0; i < listItems.length; i += 1) {
      listItems[i].classList.remove('selected');
    }
  }

  addItem(newCount) {
    // TODO: dupes some of the code in drawList, refactor to avoid that
    if (newCount > this.count) {
      this.unselectAll();
      const listItem = document.createElement('a');
      listItem.innerHTML = `Route ${this.count + 1}`;
      listItem.classList.add('selected');

      let index = this.count;
      listItem.addEventListener('click', e => {
        this.clickHandler(index);
      });
      this.wrapper.appendChild(listItem);
      this.count += 1;
    }
  }
}

export default ListComponent;
