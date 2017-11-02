import { Dispatch, Reducer } from 'redux';
import { Component } from '../components';
import { COMPONENT_INFO, getSymbol, setSymbol } from '../symbols';
import { Getter, IDisposable, IMap } from '../types';

// tslint:disable:ban-types

/**
 * Metadata stored on every component instance.
 */
export class ComponentInfo {

    public static getInfo(component: Component): ComponentInfo {
        if (!component)
            return undefined;

        return getSymbol(component, COMPONENT_INFO);
    }

    public static initInfo(component: Component): ComponentInfo {
        return setSymbol(component, COMPONENT_INFO, new ComponentInfo());
    }

    public id: any;
    public originalClass: Function;
    public dispatch: Dispatch<any>;
    public reducer: Reducer<any>;
    public disposables: IDisposable[] = [];
    public computedGetters: IMap<Getter> = {};
    public connectedProps: IMap<boolean> = {};
}