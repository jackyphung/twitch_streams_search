import React from "react";
import axios from "axios";
import { Provider, Subscribe, Container } from "unstated";

// Create a Container for our React Context. This container will
// hold state and methods just like a react component would:
export class ApiContainer extends Container {
  api_url = `${location.protocol}//${location.hostname}:${location.port}/api/`;
  service = null;

  constructor({ initialState = {}, saveState = true, service = "appState" }) {
    super();

    this.service = service;

    // The state will be available to any component we inject
    // the Container instance into
    this.state = this.getState(initialState);

    if (saveState) {
      window.addEventListener("beforeunload", () => {
        localStorage.setItem(this.service, JSON.stringify(this.state));
      });

      this.saveState(service);
    }
  }

  saveState() {
    localStorage.setItem(this.service, JSON.stringify(this.state));
  }

  getState(initialState = {}) {
    let state = localStorage.getItem(this.service);

    state =
      state !== undefined && state !== null ? JSON.parse(state) : initialState;

    return state;
  }

  deleteState() {
    localStorage.removeItem(this.service);
    this.setState(this.getState());
  }

  // These methods will also be avaiable anywhere we inject our
  // container context
  get(api_schema) {
    return axios.get(`${this.api_url}${api_schema}`);
  }

  get(api_schema, urlParam = "") {
    return axios.get(`${this.api_url}${api_schema}/${urlParam}`)
  }

  post(api_schema, data = {}) {
    return axios.post(`${this.api_url}${api_schema}`, data);
  }

  create(api_schema, data = {}, auth = false, authToken = undefined) {
    if (auth === false || authToken) {
      if (auth === true) data.token = authToken;
      return axios.post(`${this.api_url}${api_schema}`, data);
    } else {
      return false;
    }
  }

  update(api_schema, data = {}, auth = false, authToken = undefined) {
    if (auth === false || authToken) {
      if (auth === true) data.token = authToken;
      return this.http.put(`${this.api_url}${api_schema}`, data);
    } else {
      return false;
    }
  }

  delete(api_schema, data = {}, auth = false, authToken = undefined) {
    if (auth === false || authToken) {
      if (auth === true) data.token = authToken;
      return axios.delete(`${this.api_url}${api_schema}`, { data: data })
        .then(() => {
          console.log(`Deleted data in ${api_schema} collection.`);
        });
    } else {
      return false;
    }
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
const Api = new ApiContainer({ saveState: false });

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the reuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
export const ApiProvider = props => {
  // We leave the injector flexible, so you can inject a new dependency
  // at any time, eg: snapshot testing
  return <Provider inject={props.inject || [Api]}>{props.children}</Provider>;
};

export const ApiSubscriber = props => {
  // We also leave the subscribe "to" flexible, so you can have full
  // control over your subscripton from outside of the module
  return <Subscribe to={props.to || [Api]}>{props.children}</Subscribe>;
};

export default Api;

// IMPORT NOTE:
// With the above export structure, we have the ability to
// import like this:

// import Api, {ApiProvider, ApiSubscribe, ApiContainer}

// Api: Singleton Api instance, exported as default.
//      Contains your instantiated .state and methods.

// ApiProvider: Context Provider...
//      Publishes your React Context into the top of the
//      React App into the component tree.

// ApiSubscribe: Context Subsriber...
//      Subscribes to the higher Context from any place
//      lower than the point at which the Context was provided.

// ApiContainer:Context Container Class...
//      Used to instantiate new copy of your service if so desired.
//      Can be used for testing, or subsrcibing your class to a new
//      data source that uses the same data model/methods.
