export default class Section {
  constructor({ /*items,*/ renderer }, container) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(data, profileId) {
    // this._renderedItems.forEach(item => this._renderer(item))
    data.forEach(item => { 
      // console.log('/////////profileId/////////', profileId);
      // console.log('&&&&item&&&&', item);
      const isDelete = item.owner._id === profileId;
      // console.log('//////isDelete//////', isDelete);
      // console.log('/////item.owner._id/////', item.owner._id);
      // console.log('///item///', item);
      this._renderer(item, isDelete)});
  }

  addItem(element) {
    this._container.prepend(element);
  }
}