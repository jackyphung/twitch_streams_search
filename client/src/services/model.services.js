import React from "react";
import { ApiContainer } from './api.services';
import { Provider, Subscribe } from "unstated";
import { Model } from "models"

export class ModelContainer extends ApiContainer {
  api_schema = "model-api-route";

  constructor({initialState = {}, saveState = true, service = "model-service"}) {
    if (Object.keys(initialState).length == 0)
      initialState = new Model();
      
    super({ initialState: initialState, saveState: saveState, service: service });
  }

  get() {
    return super.get(this.api_schema);
  }

  get(urlParam) {
    return super.get(this.api_schema, urlParam);
  }

  post(data = {}) {
    return super.post(this.api_schema, data);
  }

  create(data = {}) {
    return super.create(this.api_schema, data);
  }

  update(data = {}) {
    return super.update(this.api_schema, data);
  }

  delete(data = {}) {
    return super.delete(this.api_schema, data);
  }
}

const ModelService = new ModelContainer({});

export const ModelServiceProvider = props => {
  return <Provider inject={props.inject || [ModelService]}>{props.children}</Provider>;
};

export const ModelServiceSubscriber = props => {
  return <Subscribe to={props.to || [ModelService]}>{props.children}</Subscribe>;
};

export default ModelService;