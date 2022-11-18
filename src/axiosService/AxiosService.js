import axios from "axios";

export default class AxiosService {
  constructor(url) {
    this.url = url + "/";
  }

  create(item, params = []) {
    const queryString = AxiosService.getQueryString(params);
    return axios.post(this.url + queryString, item).then((res) => res.data);
  }

  read(params = []) {
    const queryString = AxiosService.getQueryString(params);
    return axios.get(this.url + queryString).then((res) => res.data);
  }

  readById(id, params = []) {
    const queryString = AxiosService.getQueryString(params);
    return axios.get(this.url + id + queryString).then((res) => res.data);
  }

  readCustomEndpoint(endpoint, value) {
    let address = endpoint;
    if (value) address += "/" + value;
    return axios.get(address).then((res) => res.data);
  }

  postCustomEndpoint(endpoint, value, item) {
    let address = endpoint;
    if (value) address += "/" + value;
    return axios.post(address, item).then((res) => res.data);
  }

  update(item, differentApiName) {
    let name = this.url;
    if (differentApiName) name = differentApiName + "/";
    return axios.put(name + (item.id || item.ID), item).then((res) => res.data);
  }

  updateCustomEndpoint(endpoint, item) {
    let address = endpoint;
    if (item) {
      return axios
        .put(address + "?id=" + (item.id || item.ID), item)
        .then((res) => res.data);
    } else {
      return axios.put(address).then((res) => res.data);
    }
  }

  updateWithoutId(endpoint, item) {
    return axios.put(endpoint, item).then((res) => res.data);
  }

  delete(itemId) {
    return axios.delete(this.url + itemId).then((res) => res.data);
  }

  deleteCustomEndpoint(endpoint, value) {
    let address = endpoint;
    if (value) addres += "/" + value;
    return axios.delete(address).then((res) => res.data);
  }

  deleteCustomWQuery(endpoint, value) {
    return axios.delete(endpoint + "?id=" + value).then((res) => res.data);
  }

  getOptions(optionName) {
    return axios.get(url_options + optionName).then((res) => res.data);
  }

  uploadFile(formData) {
    return axios
      .post(url_upload, formData, { "Content-Type": "multipart/form-data" })
      .then((res) => res);
  }

  updateOrder(newOrder, apiName) {
    let name = this.url;
    if (apiName) name = apiName;
    return axios.put("Order/" + name, newOrder).then((res) => res.data);
  }

  getActionUtility(actionName, idCampaign) {
    return axios
      .get(url_actionUtility + actionName + "/" + idCampaign)
      .then((res) => res.data);
  }

  static getQueryString(params) {
    let queryString = "";
    params.forEach((x) => {
      queryString += queryString ? "&" : "?";
      queryString += x.param + "=" + x.value;
    });
    return queryString;
  }
}
