// vim: ts=4:sw=4:nu:fdc=4:nospell
/*global Ext */
/**
 * @class Ext.ux.data.BindMgr
 * @extends Ext.util.Observable
 *
 * If a component is binding, bound or unbinding to a record the BindMgr calls the following methods
 * of the bound component (if they exist):
 * <ul class="list">
 * <li><b>onBind(record)</b> after the component is bound to the record</li>
 * <li><b>onUnbind(record)</b> after the component is unbound from the record</li>
 * <li><b>afterEdit(record)</b> as the response to editing (change) of the record data</li>
 * <li><b>afterReject(record)</b> as the response to rejecting the record changes</li>
 * <li><b>afterCommit(record)</b> as the response to commiting the record changes</li>
 * </ul>
 *
 * All these methods are called in the scope of the bound component and with
 * the record triggering the change as the only argument
 *
 * @singleton
 *
 * @author    Ing. Jozef Sak‡lo?
 * @copyright (c) 2009, Ing. Jozef Sak‡lo?
 * @date      22. February 2009
 * @version   1.0
 * @revision  $Id: Ext.ux.data.BindMgr.js 609 2009-03-07 00:45:10Z jozo $
 *
 * @license Ext.ux.data.Binder is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 *
 * <p>License details: <a href="http://www.gnu.org/licenses/lgpl.html"
 * target="_blank">http://www.gnu.org/licenses/lgpl.html</a></p>
 *
 * @demo      http://examples.extjs.eu/?ex=databind
 *
 * @donate
 * <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
 * <input type="hidden" name="cmd" value="_s-xclick">
 * <input type="hidden" name="hosted_button_id" value="3430419">
 * <input type="image" src="https://www.paypal.com/en_US/i/btn/x-click-butcc-donate.gif"
 * border="0" name="submit" alt="PayPal - The safer, easier way to pay online.">
 * <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
 * </form>
 */

Ext.ns('Ext.ux.data');

Ext.ux.data.BindMgr = Ext.apply(new Ext.util.Observable(), {

    /**
     * Internal id counter
     * @private
     */
    AUTO_ID:1000

    /**
     * Stores bound records and components
     * @private
     */
    ,bounds:{}

    // {{{
    /**
     * Binds a component to a record
     * @param {Ext.data.Record} record The record to bind the component to
     * @param {Ext.Component/String/Array} cmp The instance of the component to bind to the record
     * or id of the component or the array of instances and/or ids
     */
    ,bind:function(record, cmp) {
        // handle array of components
        if (Ext.isArray(cmp)) {
            for (var i = 0; i < cmp.length; i++) {
                this.bind(record, cmp[i]);
            }
        }
        var c = this.getCmp(cmp);
        if (!record || !c || !c.id) {
            return;
        }
        var id = this.idOf(record);
        if (!id) {
            id = String(++this.AUTO_ID);
            this.bounds[id] = {};
            Ext.apply(this.bounds[id], {
                record:record
                ,components:{}
                ,size:0
            });
            record.afterEdit = record.afterEdit.createSequence(this.afterEdit, this);
            record.afterReject = record.afterReject.createSequence(this.afterReject, this);
            record.afterCommit = record.afterCommit.createSequence(this.afterCommit, this);
        }
        // do nothing if already bound
        if (this.bounds[id].components[c.id] !== c) {
            this.bounds[id].components[c.id] = c;
            this.bounds[id].size++;
            this.callMethod('onBind', record, c);
        }
    } // eo function bind
    // }}}
    // {{{
    /**
     * Unbinds the component from the record
     * @param {Ext.data.Record} record The record to unbind the component from
     * @param {Ext.Component/String} cmp (optional) The component to unbind. If it is
     * not set, all components from the record are unbound.
     */
    ,unbind:function(record, cmp) {
        var id = this.idOf(record);
        if (!id) {
            return;
        }
        var c;
        if (!cmp) {
            for (var p in this.bounds[id].components) {
                if (this.bounds[id].components.hasOwnProperty(p)) {
                    c = this.bounds[id].components[p];
                    this.unbind(record, c);
                }
            }
        }
        else {
            c = this.getCmp(cmp);
            if (c && c.id) {
                delete(this.bounds[id].components[c.id]);
                if (0 === --this.bounds[id].size) {
                    record.afterEdit = Ext.data.Record.prototype.afterEdit;
                    record.afterReject = Ext.data.Record.prototype.afterReject;
                    record.afterCommit = Ext.data.Record.prototype.afterCommit;
                    delete(this.bounds[id]);
                }
                this.callMethod('onUnbind', record, c);
            }
        }
    } // eo function unbind
    // }}}
    // {{{
    /**
     * Calls a method (if it exists in cmp) in the scope of cmp with record as argument
     * @private
     * @param {String} method The method to call
     * @param {Ext.data.Record} record The record to pass to the call
     * @param {Ext.Component} cmp The component to call the method of
     */
    ,callMethod:function(method, record, cmp) {
        if ('function' === typeof cmp[method]) {
            cmp[method](record);
        }
    } // eo function callMethod
    // }}}
    // {{{
    /**
     * Returns the instance of cmp
     * @private
     * @param {Ext.Component/String} cmp Component or id of the component
     * @return {Ext.Component}
     */
    ,getCmp:function(cmp) {
        return 'string' === typeof cmp ? Ext.getCmp(cmp) : cmp;
    } // eo function getCmp
    // }}}
    // {{{
    /**
     * Returns internal id of the passed record
     * @private
     * @return {String/Boolean} string id or boolean false if record is not bound
     */
    ,idOf:function(record) {
        for (var id in this.bounds) {
            if (this.bounds[id] && this.bounds[id].record === record) {
                return id;
            }
        }
        return false;
    } // eo function idOf
    // }}}
    // {{{
    /**
     * Calls afterEdit of the bound components
     * @private
     * @param {Ext.data.Record} record
     */
    ,afterEdit:function(record) {
        var id = this.idOf(record);
        if (id) {
            for (var p in this.bounds[id].components) {
                if (this.bounds[id].components.hasOwnProperty(p)) {
                    var c = this.bounds[id].components[p];
                    this.callMethod('afterEdit', record, c);
                }
            }
        }
    } //eo function afterEdit
    // }}}
    // {{{
    /**
     * Calls afterReject of the bound components
     * @private
     * @param {Ext.data.Record} record
     */
    ,afterReject:function(record) {
        var id = this.idOf(record);
        if (id) {
            for (var p in this.bounds[id].components) {
                if (this.bounds[id].components.hasOwnProperty(p)) {
                    var c = this.bounds[id].components[p];
                    this.callMethod('afterReject', record, c);
                }
            }
        }
    } // eo function afterReject
    // }}}
    // {{{
    /**
     * Calls afterCommit of the bound components
     * @private
     * @param {Ext.data.Record} record
     */
    ,afterCommit:function(record) {
        var id = this.idOf(record);
        if (id) {
            for (var p in this.bounds[id].components) {
                if (this.bounds[id].components.hasOwnProperty(p)) {
                    var c = this.bounds[id].components[p];
                    this.callMethod('afterCommit', record, c);
                }
            }
        }
    } // eo function afterCommit
    // }}}

}); // eo apply

// shortcut
Ext.BindMgr = Ext.ux.data.BindMgr;

// {{{
// patch Ext.data.Record
if ('function' !== typeof Ext.data.Record.prototype.afterEdit) {
    Ext.override(Ext.data.Record, {
        afterEdit:function(record) {
            if (this.store) {
                this.store.afterEdit(this);
            }
        } // eo function afterEdit

        ,set:function(name, value) {
            if (String(this.data[name]) == String(value)) {
                return;
            }
            this.dirty = true;
            if (!this.modified) {
                this.modified = {};
            }
            if (typeof this.modified[name] == 'undefined') {
                this.modified[name] = this.data[name];
            }
            this.data[name] = value;
            if (!this.editing) {
                this.afterEdit(this);
            }
        } // eo function set

        ,endEdit:function() {
            this.editing = false;
            if (this.dirty) {
                this.afterEdit(this);
            }
        } // eo function endEdit

        ,afterReject:function(record) {
            if (this.store) {
                this.store.afterReject(this);
            }
        } // eo function afterReject

        ,reject:function(silent) {
            var m = this.modified;
            for (var n in m) {
                if (typeof m[n] != "function") {
                    this.data[n] = m[n];
                }
            }
            this.dirty = false;
            delete this.modified;
            this.editing = false;
            if (silent !== true) {
                this.afterReject(this);
            }
        } // eo function reject

        ,afterCommit:function(record) {
            if (this.store) {
                this.store.afterCommit(this);
            }
        } // eo function afterCommit

        ,commit:function(silent) {
            this.dirty = false;
            delete this.modified;
            this.editing = false;
            if (silent !== true) {
                this.afterCommit(this);
            }
        } // eo function commit
    });
} // eo Record override
// }}}

// eof
