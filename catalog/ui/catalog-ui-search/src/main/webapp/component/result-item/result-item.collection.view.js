/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
/*global define, alert*/
define([
    'marionette',
    'underscore',
    'jquery',
    'js/CustomElements',
    './result-item.view',
    'js/store'
], function (Marionette, _, $, CustomElements, childView, store) {

    return Marionette.CollectionView.extend({
        tagName: CustomElements.register('result-item-collection'),
        childView: childView,
        className: 'is-list',
        initialize: function () {
            this.render = _.throttle(this.render, 250);
        },
        onAddChild: function (childView) {
            childView.$el.attr('data-index', this.children.length - 1);
        },
       /* handleFiltering: function () {
            var resultFilter = store.get('user').get('user').get('preferences').get('resultFilter');
            if (resultFilter) {
                this._resultFilter = cql.read(resultFilter);
            } else {
                this._resultFilter = undefined;
            }
            this.render();
        },
        filter: function (child) {
            if (this._resultFilter) {
                return matchesFilters(child.get('metacard').toJSON(), this._resultFilter);
            } else {
                return true;
            }
        }*/
    });
});