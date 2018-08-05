jest.mock("axios", () => require("./axios.mock"));

import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import VueMaterial from "vue-material";
import Container from "@/components/Container";

describe("Container Component", () => {
  let Constructor;
  let vm;
  let testRouter;
  let router = new VueRouter({
    routes: [
      {
        name: "cont",
        path: "cont"
      },
      {
        name: "repo",
        path: "repo"
      }
    ]
  });

  const testRepositories = [
    {
      github_id: 0,
      id: 0,
      name: "test",
      "@href": 'test'
    },
    {
      github_id: 1,
      id: 1,
      name: "other",
      "@href": 'test'
    }
  ];

  beforeAll(() => {
    Vue.use(VueRouter);
    Vue.use(VueMaterial);
    Vue.use(Vuex);
  });

  beforeEach(() => {
    Constructor = Vue.extend({
      ...Container,
      router
    });
    vm = new Constructor().$mount();
    testRouter = vm.$router;
    vm.repositories = testRepositories;
    vm.defaultRouteParams = {};
  });

  it("should render correct contents", () => {
    expect(vm).toBeTruthy();
  });

  it("should change Repository", () => {
    const spy = jest.spyOn(testRouter, "push");
    const testValue = {
      name: "test",
      id: 0
    };

    const expectedParams = {
      targetRepository: testValue.name,
      repositoryId: testValue.id
    };

    vm.changeRepository(testValue);
    expect(spy).toHaveBeenCalledWith({
      name: "repo",
      params: expectedParams,
      path: "repo"
    });
  });

  it("should navigate to DeveloperContributions", () => {
    const spy = jest.spyOn(testRouter, "push");
    const expectedParams = {
      repositories: testRepositories.map(x => x.name)
    };

    vm.viewDeveloperContributions();
    expect(spy).toHaveBeenCalledWith({
      name: "cont",
      params: expectedParams,
      path: "cont"
    });
  });

  it("should build all repositories", () => {
    vm.apiService.get = jest.fn(() => Promise.resolve({repositories: testRepositories}))
    vm.apiService.post = jest.fn(() => Promise.resolve({})) 

    vm.buildAll();
  });

  it("should alert if post fails when building all repositories", () => {
    vm.apiService.get = jest.fn(() => Promise.resolve({repositories: testRepositories}))
    vm.apiService.post = jest.fn(() => Promise.reject({})) 

    var spy = jest.spyOn(window, 'alert');
    vm.buildAll();

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("should alert if get fails when building all repositories", () => {
    vm.apiService.get = jest.fn(() => Promise.reject({}))
    vm.apiService.post = jest.fn(() => Promise.resolve({})) 

    var spy = jest.spyOn(window, 'alert');
    vm.buildAll();

    expect(spy).toHaveBeenCalled();
  });
});
