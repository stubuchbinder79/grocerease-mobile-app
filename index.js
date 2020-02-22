/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import Todos from "./Todos";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => Todos);
