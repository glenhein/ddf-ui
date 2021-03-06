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
/*global define*/
define([
    'marionette',
    'underscore',
    'jquery',
    'js/CustomElements',
    './radio',
    'text!./radio.hbs',
], function (Marionette, _, $, CustomElements, RadioModel, template) {

    return Marionette.ItemView.extend({
        template: template,
        tagName: CustomElements.register('radio'),
        modelEvents: {
            'change:value': 'handleValue',
            'change:isEditing': 'handleEditing'
        },
        events: {
            'click button': 'handleClick'
        },
        onRender: function(){
            this.handleValue();
            this.handleEditing();
        },
        handleClick: function(event){
            var value = $(event.currentTarget).attr('data-value');
            this.model.set('value', JSON.parse(value));
            this.handleValue();
        },
        handleEditing: function(){
            var isEditing = this.model.get('isEditing');
            this.$el.toggleClass('is-editing', isEditing);
            if (isEditing){
                this.$el.find('button').removeAttr('disabled');
            } else {
                this.$el.find('button').attr('disabled', 'disabled');
            }
        },
        handleValue: function(){
            this.$el.find('button').removeClass('is-selected');
            this.$el.find('[data-value="'+JSON.stringify(this.model.get('value'))+'"]').addClass('is-selected');
        },
        turnOnEditing: function(){
            this.model.set('isEditing', true);
        },
        turnOffEditing: function(){
            this.model.set('isEditing', false);
        },
        serializeData: function(){
            var modelJSON = this.model.toJSON();
            modelJSON.value = JSON.stringify(modelJSON.value);
            return modelJSON;
        }
    }, {
        createRadio: function(options, defaultValue, isEditing){
            return new this({
                model: new RadioModel({
                    options: options,
                    value: defaultValue,
                    isEditing: Boolean(isEditing)
                })
            });
        }
    });
});
