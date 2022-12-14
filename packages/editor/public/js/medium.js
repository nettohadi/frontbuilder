(function (e, h) {
  var g = e.rangy || null,
    c = e.Undo || null,
    f = (e.Key = {
      backspace: 8,
      tab: 9,
      enter: 13,
      shift: 16,
      ctrl: 17,
      alt: 18,
      pause: 19,
      capsLock: 20,
      escape: 27,
      pageUp: 33,
      pageDown: 34,
      end: 35,
      home: 36,
      leftArrow: 37,
      upArrow: 38,
      rightArrow: 39,
      downArrow: 40,
      insert: 45,
      delete: 46,
      0: 48,
      1: 49,
      2: 50,
      3: 51,
      4: 52,
      5: 53,
      6: 54,
      7: 55,
      8: 56,
      9: 57,
      a: 65,
      b: 66,
      c: 67,
      d: 68,
      e: 69,
      f: 70,
      g: 71,
      h: 72,
      i: 73,
      j: 74,
      k: 75,
      l: 76,
      m: 77,
      n: 78,
      o: 79,
      p: 80,
      q: 81,
      r: 82,
      s: 83,
      t: 84,
      u: 85,
      v: 86,
      w: 87,
      x: 88,
      y: 89,
      z: 90,
      leftWindow: 91,
      rightWindowKey: 92,
      select: 93,
      numpad0: 96,
      numpad1: 97,
      numpad2: 98,
      numpad3: 99,
      numpad4: 100,
      numpad5: 101,
      numpad6: 102,
      numpad7: 103,
      numpad8: 104,
      numpad9: 105,
      multiply: 106,
      add: 107,
      subtract: 109,
      decimalPoint: 110,
      divide: 111,
      f1: 112,
      f2: 113,
      f3: 114,
      f4: 115,
      f5: 116,
      f6: 117,
      f7: 118,
      f8: 119,
      f9: 120,
      f10: 121,
      f11: 122,
      f12: 123,
      numLock: 144,
      scrollLock: 145,
      semiColon: 186,
      equalSign: 187,
      comma: 188,
      dash: 189,
      period: 190,
      forwardSlash: 191,
      graveAccent: 192,
      openBracket: 219,
      backSlash: 220,
      closeBracket: 221,
      singleQuote: 222,
    }),
    b = (function () {
      var d = function (q) {
        var v = this,
          r = a.deepExtend({}, d.defaultSettings),
          n = (this.settings = a.deepExtend(r, q)),
          k = new d.Cache(),
          t = new d.Selection(),
          o = new d.Action(this),
          u = new d.Cursor(this),
          s = new d.Undoable(this),
          m,
          l,
          p;
        for (p in r) {
          if (r.hasOwnProperty(p)) {
            if (
              typeof r[p] !== 'object' &&
              r.hasOwnProperty(p) &&
              n.element.getAttribute('data-medium-' + f)
            ) {
              l = n.element.getAttribute('data-medium-' + f);
              if (l.toLowerCase() === 'false' || l.toLowerCase() === 'true') {
                l = l.toLowerCase() === 'true';
              }
              n[p] = l;
            }
          }
        }
        if (n.modifiers) {
          for (p in n.modifiers) {
            if (n.modifiers.hasOwnProperty(p)) {
              if (typeof f[p] !== 'undefined') {
                n.modifiers[f[p]] = n.modifiers[p];
              }
            }
          }
        }
        if (n.keyContext) {
          for (p in n.keyContext) {
            if (n.keyContext.hasOwnProperty(p)) {
              if (typeof f[p] !== 'undefined') {
                n.keyContext[f[p]] = n.keyContext[p];
              }
            }
          }
        }
        m = n.element;
        m.contentEditable = true;
        m.className +=
          ' ' +
          n.cssClasses.editor +
          (' ' + n.cssClasses.editor + '-' + n.mode);
        n.tags = n.tags || {};
        if (n.tags.outerLevel) {
          n.tags.outerLevel = n.tags.outerLevel.concat([
            n.tags.paragraph,
            n.tags.horizontalRule,
          ]);
        }
        this.settings = n;
        this.element = m;
        m.medium = this;
        this.action = o;
        this.cache = k;
        this.cursor = u;
        this.utils = a;
        this.selection = t;
        v.clean();
        v.placeholders();
        o.preserveElementFocus();
        this.dirty = false;
        this.undoable = s;
        this.makeUndoable = s.makeUndoable;
        if (n.drag) {
          v.drag = new d.Drag(v);
          v.drag.setup();
        }
        o.setup();
        k.initialized = true;
        this.makeUndoable(true);
      };
      d.prototype = {
        placeholders: function () {
          if (!e.getComputedStyle) {
            return;
          }
          var u = this.settings,
            p = this.placeholder || (this.placeholder = h.createElement('div')),
            m = this.element,
            k = p.style,
            q = e.getComputedStyle(m, null),
            o = function (s) {
              return q.getPropertyValue(s);
            },
            r = a.text(m),
            t = this.cursor,
            n = m.children.length,
            l = d.activeElement === m;
          m.placeholder = p;
          if (!l && r.length < 1 && n < 2) {
            if (m.placeHolderActive) {
              return;
            }
            if (!m.innerHTML.match('<' + u.tags.paragraph)) {
              m.innerHTML = '';
            }
            if (u.placeholder.length > 0) {
              if (!p.setup) {
                p.setup = true;
                k.background = o('background');
                k.backgroundColor = o('background-color');
                k.fontSize = o('font-size');
                k.color = q.color;
                k.marginTop = o('margin-top');
                k.marginBottom = o('margin-bottom');
                k.marginLeft = o('margin-left');
                k.marginRight = o('margin-right');
                k.paddingTop = o('padding-top');
                k.paddingBottom = o('padding-bottom');
                k.paddingLeft = o('padding-left');
                k.paddingRight = o('padding-right');
                k.borderTopWidth = o('border-top-width');
                k.borderTopColor = o('border-top-color');
                k.borderTopStyle = o('border-top-style');
                k.borderBottomWidth = o('border-bottom-width');
                k.borderBottomColor = o('border-bottom-color');
                k.borderBottomStyle = o('border-bottom-style');
                k.borderLeftWidth = o('border-left-width');
                k.borderLeftColor = o('border-left-color');
                k.borderLeftStyle = o('border-left-style');
                k.borderRightWidth = o('border-right-width');
                k.borderRightColor = o('border-right-color');
                k.borderRightStyle = o('border-right-style');
                p.className =
                  u.cssClasses.placeholder +
                  ' ' +
                  u.cssClasses.placeholder +
                  '-' +
                  u.mode;
                p.innerHTML = '<div>' + u.placeholder + '</div>';
                m.parentNode.insertBefore(p, m);
              }
              m.className += ' ' + u.cssClasses.clear;
              k.display = '';
              k.minHeight = m.clientHeight + 'px';
              k.minWidth = m.clientWidth + 'px';
              if (u.mode !== d.inlineMode && u.mode !== d.inlineRichMode) {
                this.setupContents();
                if (n === 0 && m.firstChild) {
                  t.set(this, 0, m.firstChild);
                }
              }
            }
            m.placeHolderActive = true;
          } else {
            if (m.placeHolderActive) {
              m.placeHolderActive = false;
              k.display = 'none';
              m.className = a.trim(m.className.replace(u.cssClasses.clear, ''));
              this.setupContents();
            }
          }
        },
        clean: function (k) {
          var w = this.settings,
            n = w.cssClasses.placeholder,
            o = (w.attributes || {}).remove || [],
            x = w.tags || {},
            r = x.outerLevel || null,
            t = x.innerLevel || null,
            y = {},
            v = {},
            q = (x.paragraph || '').toUpperCase(),
            m = this.html,
            p,
            u,
            l;
          k = k || w.element;
          if (w.mode === d.inlineRichMode) {
            r = w.tags.innerLevel;
          }
          if (r !== null) {
            for (l = 0; l < r.length; l++) {
              y[r[l].toUpperCase()] = true;
            }
          }
          if (t !== null) {
            for (l = 0; l < t.length; l++) {
              v[t[l].toUpperCase()] = true;
            }
          }
          a.traverseAll(k, {
            element: function (E, z, C, A) {
              var D = E.nodeName,
                s = true,
                B;
              for (l = 0; l < o.length; l++) {
                p = o[l];
                if (E.hasAttribute(p)) {
                  B = E.getAttribute(p);
                  if (B !== n && !B.match('medium-') && p === 'class') {
                    E.removeAttribute(p);
                  }
                }
              }
              if (r === null && t === null) {
                return;
              }
              if (C === 1 && y[D] !== undefined) {
                s = false;
              } else {
                if (C > 1 && v[D] !== undefined) {
                  s = false;
                }
              }
              if (s) {
                if (
                  e.getComputedStyle(E, null).getPropertyValue('display') ===
                  'block'
                ) {
                  if (q.length > 0 && q !== D) {
                    a.changeTag(E, q);
                  }
                  if (C > 1) {
                    while (A.childNodes.length > z) {
                      A.parentNode.insertBefore(A.lastChild, A.nextSibling);
                    }
                  }
                } else {
                  switch (D) {
                    case 'BR':
                      if (E === E.parentNode.lastChild) {
                        if (E === E.parentNode.firstChild) {
                          break;
                        }
                        u = h.createTextNode('');
                        u.innerHTML = '&nbsp';
                        E.parentNode.insertBefore(u, E);
                        break;
                      }
                    default:
                      while (E.firstChild !== null) {
                        E.parentNode.insertBefore(E.firstChild, E);
                      }
                      a.detachNode(E);
                      break;
                  }
                }
              }
            },
          });
        },
        insertHtml: function (l, o, m) {
          var k = new d.Html(this, l).insert(this.settings.beforeInsertHtml),
            n = k[k.length - 1];
          if (m === true) {
            a.triggerEvent(this.element, 'change');
          }
          if (o) {
            o.apply(k);
          }
          switch (n.nodeName) {
            case 'UL':
            case 'OL':
            case 'DL':
              if (n.lastChild !== null) {
                this.cursor.moveCursorToEnd(n.lastChild);
                break;
              }
            default:
              this.cursor.moveCursorToEnd(n);
          }
          return this;
        },
        addTag: function (l, k, m, o) {
          if (!this.settings.beforeAddTag(l, k, m, o)) {
            var p = h.createElement(l),
              n;
            if (typeof m !== 'undefined' && m === false) {
              p.contentEditable = false;
            }
            if (p.innerHTML.length == 0) {
              p.innerHTML = ' ';
            }
            if (o && o.nextSibling) {
              o.parentNode.insertBefore(p, o.nextSibling);
              n = o.nextSibling;
            } else {
              this.element.appendChild(p);
              n = this.lastChild();
            }
            if (k) {
              this.cache.focusedElement = n;
              this.cursor.set(this, 0, n);
            }
            return p;
          }
          return null;
        },
        invokeElement: function (m, l, o) {
          var n = this.settings,
            k = l.remove || [];
          l = l || {};
          switch (n.mode) {
            case d.inlineMode:
            case d.partialMode:
              return this;
            default:
          }
          if (k.length > 0) {
            if (!a.arrayContains(n, 'class')) {
              k.push('class');
            }
          }
          new d.Element(this, m, l).invoke(this.settings.beforeInvokeElement);
          if (o === true) {
            a.triggerEvent(this.element, 'change');
          }
          return this;
        },
        value: function (k) {
          if (typeof k !== 'undefined') {
            this.element.innerHTML = k;
            this.clean();
            this.placeholders();
            this.makeUndoable();
          } else {
            return this.element.innerHTML;
          }
          return this;
        },
        focus: function () {
          var k = this.element;
          k.focus();
          return this;
        },
        select: function () {
          a.selectNode((d.activeElement = this.element));
          return this;
        },
        isActive: function () {
          return d.activeElement === this.element;
        },
        setupContents: function () {
          var n = this.element,
            l = n.children,
            o = n.childNodes,
            k,
            m = this.settings;
          if (
            !m.tags.paragraph ||
            l.length > 0 ||
            m.mode === d.inlineMode ||
            m.mode === d.inlineRichMode
          ) {
            return d.Utilities;
          }
          if (o.length > 0) {
            k = h.createElement(m.tags.paragraph);
            if (n.innerHTML.match('^[&]nbsp[;]')) {
              n.innerHTML = n.innerHTML.substring(6, n.innerHTML.length - 1);
            }
            k.innerHTML = n.innerHTML;
            n.innerHTML = '';
            n.appendChild(k);
          } else {
            k = h.createElement(m.tags.paragraph);
            k.innerHTML = '&nbsp;';
            n.appendChild(k);
            this.cursor.set(this, 0, n.firstChild);
          }
          return this;
        },
        destroy: function () {
          var l = this.element,
            k = this.settings,
            m = this.placeholder || null;
          if (m !== null && m.setup && m.parentNode !== null) {
            m.parentNode.removeChild(m);
            delete l.placeHolderActive;
          }
          l.removeAttribute('contenteditable');
          l.className = a.trim(
            l.className
              .replace(k.cssClasses.editor, '')
              .replace(k.cssClasses.clear, '')
              .replace(k.cssClasses.editor + '-' + k.mode, '')
          );
          this.action.destroy();
          if (this.settings.drag) {
            this.drag.destroy();
          }
        },
        clear: function () {
          this.element.innerHTML = '';
          this.placeholders();
        },
        splitAtCaret: function () {
          if (!this.isActive()) {
            return null;
          }
          var k = e.getSelection || h.selection,
            q = k(),
            r = q.focusOffset,
            p = q.focusNode,
            m = this.element,
            l = h.createRange(),
            o = h.createRange(),
            n;
          l.setStart(p, r);
          o.selectNodeContents(m);
          l.setEnd(o.endContainer, o.endOffset);
          n = l.extractContents();
          return n;
        },
        deleteSelection: function () {
          if (!this.isActive()) {
            return;
          }
          var l = g.getSelection(),
            k;
          if (l.rangeCount > 0) {
            k = l.getRangeAt(0);
            k.deleteContents();
          }
        },
        lastChild: function () {
          return this.element.lastChild;
        },
        bold: function () {
          switch (this.settings.mode) {
            case d.partialMode:
            case d.inlineMode:
              return this;
          }
          new d.Element(this, 'bold')
            .setClean(false)
            .invoke(this.settings.beforeInvokeElement);
          return this;
        },
        underline: function () {
          switch (this.settings.mode) {
            case d.partialMode:
            case d.inlineMode:
              return this;
          }
          new d.Element(this, 'underline')
            .setClean(false)
            .invoke(this.settings.beforeInvokeElement);
          return this;
        },
        italicize: function () {
          switch (this.settings.mode) {
            case d.partialMode:
            case d.inlineMode:
              return this;
          }
          new d.Element(this, 'italic')
            .setClean(false)
            .invoke(this.settings.beforeInvokeElement);
          return this;
        },
        quote: function () {
          return this;
        },
        paste: function (s) {
          var p = this.value(),
            l = p.length,
            r,
            n = this.settings,
            q = this.selection,
            m = this.element,
            t = this,
            o = function (u) {
              u = u || '';
              if (u.length > 0) {
                m.focus();
                d.activeElement = m;
                q.restoreSelection(k);
                u = a.encodeHtml(u);
                r = u.length + l;
                if (n.maxLength > 0 && r > n.maxLength) {
                  u = u.substring(0, n.maxLength - l);
                }
                if (n.mode !== d.inlineMode) {
                  u = u.replace(/\n/g, '<br>');
                }
                new d.Html(t, u)
                  .setClean(false)
                  .insert(n.beforeInsertHtml, true);
                t.clean();
                t.placeholders();
              }
            };
          t.makeUndoable();
          if (s !== undefined) {
            o(s);
          } else {
            if (n.pasteAsText) {
              var k = q.saveSelection();
              a.pasteHook(this, o);
            } else {
              setTimeout(function () {
                t.clean();
                t.placeholders();
              }, 20);
            }
          }
          return true;
        },
        undo: function () {
          var l = this.undoable,
            k = l.stack,
            m = k.canUndo();
          if (m) {
            k.undo();
          }
          return this;
        },
        redo: function () {
          var l = this.undoable,
            k = l.stack,
            m = k.canRedo();
          if (m) {
            k.redo();
          }
          return this;
        },
      };
      d.inlineMode = 'inline';
      d.partialMode = 'partial';
      d.richMode = 'rich';
      d.inlineRichMode = 'inlineRich';
      d.Messages = { pastHere: 'Paste Here' };
      d.defaultSettings = {
        element: null,
        modifier: 'auto',
        placeholder: '',
        autofocus: false,
        autoHR: true,
        mode: d.richMode,
        maxLength: -1,
        modifiers: { b: 'bold', i: 'italicize', u: 'underline' },
        tags: {
          break: 'br',
          horizontalRule: 'hr',
          paragraph: 'p',
          outerLevel: ['pre', 'blockquote', 'figure'],
          innerLevel: ['a', 'b', 'u', 'i', 'img', 'strong'],
        },
        cssClasses: {
          editor: 'Medium',
          pasteHook: 'Medium-paste-hook',
          placeholder: 'Medium-placeholder',
          clear: 'Medium-clear',
        },
        attributes: { remove: ['style', 'class'] },
        pasteAsText: true,
        beforeInvokeElement: function () {},
        beforeInsertHtml: function () {},
        maxLengthReached: function (k) {},
        beforeAddTag: function (l, k, m, n) {},
        onBlur: function () {},
        onFocus: function () {},
        keyContext: null,
        drag: false,
      };
      (function (l, k, n) {
        function m(o) {
          if (
            o.hasOwnProperty('target') &&
            o.target.getAttribute('contenteditable') === 'false'
          ) {
            a.preventDefaultEvent(o);
            return false;
          }
          return true;
        }
        l.Action = function (o) {
          this.medium = o;
          this.handledEvents = {
            keydown: null,
            keyup: null,
            blur: null,
            focus: null,
            paste: null,
            click: null,
          };
        };
        l.Action.prototype = {
          setup: function () {
            this.handleFocus()
              .handleBlur()
              .handleKeyDown()
              .handleKeyUp()
              .handlePaste()
              .handleClick();
          },
          destroy: function () {
            var o = this.medium.element;
            a.removeEvent(o, 'focus', this.handledEvents.focus)
              .removeEvent(o, 'blur', this.handledEvents.blur)
              .removeEvent(o, 'keydown', this.handledEvents.keydown)
              .removeEvent(o, 'keyup', this.handledEvents.keyup)
              .removeEvent(o, 'paste', this.handledEvents.paste)
              .removeEvent(o, 'click', this.handledEvents.click);
          },
          handleFocus: function () {
            var o = this.medium,
              p = o.element;
            a.addEvent(
              p,
              'focus',
              (this.handledEvents.focus = function (q) {
                q = q || k.event;
                if (!m(q)) {
                  return false;
                }
                l.activeElement = p;
                o.cache.originalVal = q.target.textContent;
                o.settings.onFocus(q);
                o.placeholders();
              })
            );
            return this;
          },
          handleBlur: function () {
            var o = this.medium,
              p = o.element;
            a.addEvent(
              p,
              'blur',
              (this.handledEvents.blur = function (q) {
                q = q || k.event;
                if (l.activeElement === p) {
                  l.activeElement = null;
                }
                o.settings.onBlur(q);
                o.placeholders();
              })
            );
            return this;
          },
          handleKeyDown: function () {
            var s = this,
              p = this.medium,
              r = p.settings,
              o = p.cache,
              q = p.element;
            a.addEvent(
              q,
              'keydown',
              (this.handledEvents.keydown = function (z) {
                z = z || k.event;
                if (!m(z)) {
                  return false;
                }
                var u = true;
                if (z.keyCode === 229) {
                  return;
                }
                a.isCommand(
                  r,
                  z,
                  function () {
                    o.cmd = true;
                  },
                  function () {
                    o.cmd = false;
                  }
                );
                a.isShift(
                  z,
                  function () {
                    o.shift = true;
                  },
                  function () {
                    o.shift = false;
                  }
                );
                a.isModifier(r, z, function (C) {
                  if (o.cmd) {
                    if (r.mode === l.inlineMode || r.mode === l.partialMode) {
                      a.preventDefaultEvent(z);
                      return false;
                    }
                    var B = typeof C;
                    var A = null;
                    if (B === 'function') {
                      A = C;
                    } else {
                      A = p[C];
                    }
                    u = A.call(p, z);
                    if (u === false || u === p) {
                      a.preventDefaultEvent(z);
                      a.stopPropagation(z);
                    }
                    return true;
                  }
                  return false;
                });
                if (r.maxLength !== -1) {
                  var t = a.text(q).length,
                    v = false,
                    y = k.getSelection(),
                    x = a.isSpecial(z),
                    w = a.isNavigational(z);
                  if (y) {
                    v = !y.isCollapsed;
                  }
                  if (x || w) {
                    return true;
                  }
                  if (t >= r.maxLength && !v) {
                    r.maxLengthReached(q);
                    a.preventDefaultEvent(z);
                    return false;
                  }
                }
                switch (z.keyCode) {
                  case f.enter:
                    if (s.enterKey(z) === false) {
                      a.preventDefaultEvent(z);
                    }
                    break;
                  case f.escape:
                    if (s.escKey(z) === false) {
                      a.preventDefaultEvent(z);
                    }
                    break;
                  case f.backspace:
                  case f['delete']:
                    s.backspaceOrDeleteKey(z);
                    break;
                }
                return u;
              })
            );
            return this;
          },
          handleKeyUp: function () {
            var s = this,
              p = this.medium,
              r = p.settings,
              o = p.cache,
              t = p.cursor,
              q = p.element;
            a.addEvent(
              q,
              'keyup',
              (this.handledEvents.keyup = function (w) {
                w = w || k.event;
                if (!m(w)) {
                  return false;
                }
                a.isCommand(
                  r,
                  w,
                  function () {
                    o.cmd = false;
                  },
                  function () {
                    o.cmd = true;
                  }
                );
                p.clean();
                p.placeholders();
                var v;
                if (r.keyContext !== null && (v = r.keyContext[w.keyCode])) {
                  var u = t.parent();
                  if (u) {
                    v.call(p, w, u);
                  }
                }
                s.preserveElementFocus();
              })
            );
            return this;
          },
          handlePaste: function () {
            var w = this.medium,
              o = w.element,
              v,
              q,
              u,
              p,
              s,
              t,
              r;
            a.addEvent(
              o,
              'paste',
              (this.handledEvents.paste = function (x) {
                x = x || k.event;
                if (!m(x)) {
                  return false;
                }
                q = 0;
                a.preventDefaultEvent(x);
                v = '';
                s = x.clipboardData;
                if (s && (p = s.getData)) {
                  r = s.types;
                  u = r.length;
                  for (q = 0; q < u; q++) {
                    t = r[q];
                    switch (t) {
                      case 'text/plain':
                        return w.paste(s.getData('text/plain'));
                    }
                  }
                }
                w.paste();
              })
            );
            return this;
          },
          handleClick: function () {
            var o = this.medium,
              p = o.element,
              q = o.cursor;
            a.addEvent(
              p,
              'click',
              (this.handledEvents.click = function (r) {
                if (!m(r)) {
                  q.caretToAfter(r.target);
                }
              })
            );
            return this;
          },
          escKey: function (s) {
            var p = this.medium,
              r = p.element,
              q = p.settings,
              o = p.cache;
            if (q.mode === l.inlineMode || q.mode === l.inlineRichMode) {
              s.target.textContent = o.originalVal;
              if (q.element.blur) {
                q.element.blur();
              } else {
                if (q.element.onblur) {
                  q.element.onblur();
                }
              }
              return false;
            }
          },
          enterKey: function (v) {
            var z = this.medium,
              q = z.element,
              s = z.settings,
              o = z.cache,
              y = z.cursor;
            if (s.mode === l.inlineMode || s.mode === l.inlineRichMode) {
              if (s.element.blur) {
                s.element.blur();
              } else {
                if (s.element.onblur) {
                  s.element.onblur();
                }
              }
              return false;
            }
            if (o.shift) {
              if (s.tags['break']) {
                z.addTag(s.tags['break'], true);
                return false;
              }
            } else {
              var w = a.atCaret(z) || {},
                r = q.children,
                p = w === q.lastChild ? q.lastChild : null,
                u,
                x,
                t;
              if (
                p &&
                p !== q.firstChild &&
                s.autoHR &&
                s.mode !== l.partialMode &&
                s.tags.horizontalRule
              ) {
                a.preventDefaultEvent(v);
                u =
                  a.text(p) === '' &&
                  p.nodeName.toLowerCase() === s.tags.paragraph;
                if (u && r.length >= 2) {
                  x = r[r.length - 2];
                  if (x.nodeName.toLowerCase() === s.tags.horizontalRule) {
                    u = false;
                  }
                }
                if (u) {
                  z.addTag(s.tags.horizontalRule, false, true, w);
                  w = w.nextSibling;
                }
                if ((t = z.addTag(s.tags.paragraph, true, null, w)) !== null) {
                  t.innerHTML = '';
                  y.set(z, 0, t);
                }
              }
            }
            return true;
          },
          backspaceOrDeleteKey: function (s) {
            var v = this.medium,
              u = v.cursor,
              r = v.settings,
              p = v.element;
            if (r.onBackspaceOrDelete !== undefined) {
              var w = r.onBackspaceOrDelete.call(v, s, p);
              if (w) {
                return;
              }
            }
            if (p.lastChild === null) {
              return;
            }
            var o = p.lastChild,
              q = o.previousSibling,
              t = g.getSelection().anchorNode;
            if (
              o &&
              r.tags.horizontalRule &&
              o.nodeName.toLocaleLowerCase() === r.tags.horizontalRule
            ) {
              p.removeChild(o);
            } else {
              if (
                o &&
                q &&
                a.text(o).length < 1 &&
                q.nodeName.toLowerCase() === r.tags.horizontalRule &&
                o.nodeName.toLowerCase() === r.tags.paragraph
              ) {
                p.removeChild(o);
                p.removeChild(q);
              } else {
                if (p.childNodes.length === 1 && o && !a.text(o).length) {
                  a.preventDefaultEvent(s);
                  v.setupContents();
                } else {
                  if (t && t === p) {
                    v.deleteSelection();
                    v.setupContents();
                    u.set(v, 0, p.firstChild);
                  }
                }
              }
            }
          },
          preserveElementFocus: function () {
            var w = k.getSelection
              ? k.getSelection().anchorNode
              : document.activeElement;
            if (w) {
              var x = this.medium,
                o = x.cache,
                p = x.element,
                y = x.settings,
                v = w.parentNode,
                q = p.children,
                u = v !== o.focusedElement,
                r = 0,
                t;
              if (v === y.element) {
                v = w;
              }
              for (t = 0; t < q.length; t++) {
                if (v === q[t]) {
                  r = t;
                  break;
                }
              }
              if (u) {
                o.focusedElement = v;
                o.focusedElementIndex = r;
              }
            }
          },
        };
      })(d, e, h);
      (function (k) {
        k.Cache = function () {
          this.initialized = false;
          this.cmd = false;
          this.focusedElement = null;
          this.originalVal = null;
        };
      })(d);
      (function (k) {
        k.Cursor = function (l) {
          this.medium = l;
        };
        k.Cursor.prototype = {
          set: function (s, o) {
            var l;
            if (h.createRange) {
              var n = e.getSelection(),
                r = this.medium.lastChild(),
                q = a.text(r).length - 1,
                m = o ? o : r,
                p = typeof s !== 'undefined' && s !== null ? s : q;
              l = h.createRange();
              l.setStart(m, p);
              l.collapse(true);
              n.removeAllRanges();
              n.addRange(l);
            } else {
              l = h.body.createTextRange();
              l.moveToElementText(o);
              l.collapse(false);
              l.select();
            }
          },
          moveCursorToEnd: function (n) {
            var m = g.getSelection(),
              l = g.createRange();
            l.setStartAfter(n);
            l.setEnd(n, n.length || n.childNodes.length);
            m.removeAllRanges();
            m.addRange(l);
          },
          moveCursorToAfter: function (m) {
            var n = g.getSelection();
            if (n.rangeCount) {
              var l = n.getRangeAt(0);
              l.collapse(false);
              l.collapseAfter(m);
              n.setSingleRange(l);
            }
          },
          parent: function () {
            var m = null,
              l;
            if (e.getSelection) {
              l = e.getSelection().getRangeAt(0);
              m = l.commonAncestorContainer;
              m = m.nodeType === 1 ? m : m.parentNode;
            } else {
              if (h.selection) {
                m = h.selection.createRange().parentElement();
              }
            }
            if (m.tagName == 'SPAN') {
              m = m.parentNode;
            }
            return m;
          },
          caretToBeginning: function (l) {
            this.set(0, l);
          },
          caretToEnd: function (l) {
            this.moveCursorToEnd(l);
          },
          caretToAfter: function (l) {
            this.moveCursorToAfter(l);
          },
        };
      })(d);
      (function (k) {
        k.Drag = function (m) {
          this.medium = m;
          var o = this,
            l = this.iconSrc.replace(
              /[{][{]([a-zA-Z]+)[}][}]/g,
              function (q, p) {
                if (o.hasOwnProperty(p)) {
                  return o[p];
                }
                return q;
              }
            ),
            n = (this.icon = h.createElement('img'));
          n.className = this.buttonClass;
          n.setAttribute('contenteditable', 'false');
          n.setAttribute('src', l);
          this.hide();
          this.element = null;
          this.protectedElement = null;
          this.handledEvents = {
            dragstart: null,
            dragend: null,
            mouseover: null,
            mouseout: null,
            mousemove: null,
          };
        };
        k.Drag.prototype = {
          elementClass: 'Medium-focused',
          buttonClass: 'Medium-drag',
          iconSrc:
            'data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="21.424px" height="21.424px" viewBox="0 0 21.424 21.424" style="enable-background:new 0 0 21.424 21.424;" xml:space="preserve">	<g>		<g>			<path style="fill:{{iconColor}};" d="M13.616,17.709L13.616,17.709h0.781l-3.686,3.715l-3.685-3.715h0.781l0,0H13.616z M13.616,17.709 M14.007,17.709 M12.555,19.566 M8.87,19.566 M7.418,17.709 M7.809,17.709 M10.712,17.709"/>			<path style="fill:{{iconColor}};" d="M13.616,3.715L13.616,3.715h0.781L10.712,0L7.027,3.715h0.781l0,0H13.616z M13.616,3.715 M14.007,3.715 M12.555,1.858 M8.87,1.858 M7.418,3.715 M7.809,3.715 M10.712,3.715"/>			<path style="fill:{{iconColor}};" d="M3.716,13.616L3.716,13.616v0.781L0,10.712l3.716-3.685v0.781l0,0V13.616z M3.716,13.616 M3.716,14.007 M1.858,12.555 M1.858,8.87 M3.716,7.417 M3.716,7.808 M3.716,10.712"/>			<path style="fill:{{iconColor}};" d="M17.709,13.616L17.709,13.616v0.781l3.715-3.685l-3.715-3.685v0.781l0,0V13.616z M17.709,13.616 M17.709,14.007 M19.566,12.555 M19.566,8.87 M17.709,7.417 M17.709,7.808 M17.709,10.712"/>		</g>		<path style="fill-rule:evenodd;clip-rule:evenodd;fill:{{iconColor}};" d="M10.712,6.608c2.267,0,4.104,1.838,4.104,4.104 c0,2.266-1.837,4.104-4.104,4.104c-2.266,0-4.104-1.837-4.104-4.104C6.608,8.446,8.446,6.608,10.712,6.608L10.712,6.608z M10.712,7.515c-1.765,0-3.196,1.432-3.196,3.197s1.432,3.197,3.196,3.197c1.766,0,3.197-1.432,3.197-3.197 S12.478,7.515,10.712,7.515z"/>	</g></svg>',
          iconColor: '#231F20',
          setup: function () {
            this.handleDragstart()
              .handleDragend()
              .handleMouseover()
              .handleMouseout()
              .handleMousemove();
            return this;
          },
          destroy: function () {
            a.removeEvent(this.icon, 'dragstart', this.handledEvents.dragstart)
              .removeEvent(this.icon, 'dragend', this.handledEvents.dragend)
              .removeEvent(this.icon, 'mouseover', this.handledEvents.mouseover)
              .removeEvent(this.icon, 'mouseout', this.handledEvents.mouseout)
              .removeEvent(
                this.medium.element,
                'mousemove',
                this.handledEvents.mousemove
              );
            return this;
          },
          hide: function () {
            a.hide(this.icon);
            return this;
          },
          handleDragstart: function () {
            var l = this;
            a.addEvent(
              this.icon,
              'dragstart',
              (this.handledEvents.dragstart = function (m) {
                if (l.protectedElement !== null) {
                  return;
                }
                m = m || e.event;
                l.protectedElement = a.detachNode(l.element);
                l.icon.style.opacity = 0;
              })
            );
            return this;
          },
          handleDragend: function () {
            var l = this;
            a.addEvent(
              this.icon,
              'dragend',
              (this.handledEvents.dragend = h.body.ondragend =
                function (m) {
                  if (l.protectedElement === null) {
                    return;
                  }
                  setTimeout(function () {
                    l.cleanCanvas();
                    l.protectedElement = null;
                  }, 1);
                })
            );
            return this;
          },
          handleMouseover: function () {
            var l = this;
            a.addEvent(
              this.icon,
              'mouseover',
              (this.handledEvents.mouseover = function (m) {
                if (l.protectedElement !== null) {
                  return;
                }
                a.stopPropagation(m).addClass(l.element, l.elementClass);
              })
            );
            return this;
          },
          handleMouseout: function () {
            var l = this;
            a.addEvent(
              this.icon,
              'mouseout',
              (this.handledEvents.mouseout = function (m) {
                if (l.protectedElement !== null) {
                  return;
                }
                a.stopPropagation(m).removeClass(l.element, l.elementClass);
              })
            );
            return this;
          },
          handleMousemove: function () {
            var l = this;
            a.addEvent(
              this.medium.element,
              'mousemove',
              (this.handledEvents.mousemove = function (n) {
                n = n || e.event;
                var m = n.target || {};
                if (m.getAttribute('contenteditable') === 'false') {
                  l.show(m);
                }
              })
            );
            return this;
          },
          show: function (m) {
            if (m === this.icon && this.protectedElement === null) {
              return;
            }
            this.element = m;
            var l = this.icon.style,
              o = m.offsetLeft,
              n = m.offsetTop;
            m.dragIcon = this.icon;
            m.parentNode.appendChild(this.icon);
            l.opacity = 1;
            l.left = o + 'px';
            l.top = n + 'px';
            a.show(this.icon);
            return this;
          },
          cleanCanvas: function () {
            var n,
              l = false,
              m = h.getElementsByClassName(this.buttonClass);
            this.icon.style.opacity = 1;
            while (m.length > 0) {
              if (a.isVisible((n = m[0]))) {
                if (!l) {
                  n.parentNode.insertBefore(this.element, n);
                  l = true;
                }
                a.detachNode(n);
              }
            }
            a.detachNode(this.icon);
            return this;
          },
        };
      })(d);
      (function (k) {
        k.Element = function (m, n, l) {
          this.medium = m;
          this.element = m.element;
          switch (n.toLowerCase()) {
            case 'bold':
              this.tagName = 'b';
              break;
            case 'italic':
              this.tagName = 'i';
              break;
            case 'underline':
              this.tagName = 'u';
              break;
            default:
              this.tagName = n;
          }
          this.attributes = l || {};
          this.clean = true;
        };
        k.Element.prototype = {
          invoke: function (p) {
            if (k.activeElement === this.element) {
              if (p) {
                p.apply(this);
              }
              var l = this.attributes,
                o = this.tagName.toLowerCase(),
                n,
                m;
              if (l.className !== undefined) {
                m = (l.className.split[' '] || [l.className]).shift();
                delete l.className;
              } else {
                m = 'medium-' + o;
              }
              n = g.createClassApplier(m, {
                elementTagName: o,
                elementAttributes: this.attributes,
              });
              this.medium.makeUndoable();
              n.toggleSelection(e);
              if (this.clean) {
                this.medium.clean();
                this.medium.placeholders();
              }
            }
          },
          setClean: function (l) {
            this.clean = l;
            return this;
          },
        };
      })(d);
      (function (k) {
        k.Html = function (l, m) {
          this.html = m;
          this.medium = l;
          this.clean = true;
          this.injector = new k.Injector();
        };
        k.Html.prototype = {
          insert: function (n, m) {
            if (k.activeElement === this.medium.element) {
              if (n) {
                n.apply(this);
              }
              var l = this.injector.inject(this.html, m);
              if (this.clean) {
                this.medium.clean();
                this.medium.placeholders();
              }
              this.medium.makeUndoable();
              return l;
            } else {
              return null;
            }
          },
          setClean: function (l) {
            this.clean = l;
            return this;
          },
        };
      })(d);
      (function (k) {
        k.Injector = function () {};
        k.Injector.prototype = {
          inject: function (n) {
            var m = [],
              p,
              l = false;
            if (typeof n === 'string') {
              var s = h.createElement('div');
              s.innerHTML = n;
              p = s.childNodes;
              l = true;
            } else {
              p = n;
            }
            this.insertHTML('<span id="Medium-wedge"></span>');
            var r = h.getElementById('Medium-wedge'),
              q = r.parentNode,
              o = 0;
            r.removeAttribute('id');
            if (l) {
              while (o < p.length) {
                m.push(p[o]);
                o++;
              }
              while (p.length > 0) {
                q.insertBefore(p[0], r);
              }
            } else {
              m.push(p);
              q.insertBefore(p, r);
            }
            q.removeChild(r);
            r = null;
            return m;
          },
          insertHTML: function (r, t) {
            var n, s;
            if (e.getSelection) {
              n = e.getSelection();
              if (n.getRangeAt && n.rangeCount) {
                s = n.getRangeAt(0);
                s.deleteContents();
                var o = h.createElement('div');
                o.innerHTML = r;
                var u = h.createDocumentFragment(),
                  p,
                  m;
                while ((p = o.firstChild)) {
                  m = u.appendChild(p);
                }
                var l = u.firstChild;
                s.insertNode(u);
                if (m) {
                  s = s.cloneRange();
                  s.setStartAfter(m);
                  if (t) {
                    s.setStartBefore(l);
                  } else {
                    s.collapse(true);
                  }
                  n.removeAllRanges();
                  n.addRange(s);
                }
              }
            } else {
              if ((n = h.selection) && n.type != 'Control') {
                var q = n.createRange();
                q.collapse(true);
                n.createRange().pasteHTML(r);
                if (t) {
                  s = n.createRange();
                  s.setEndPoint('StartToStart', q);
                  s.select();
                }
              }
            }
          },
        };
      })(d);
      (function (k) {
        k.Selection = function () {};
        k.Selection.prototype = {
          saveSelection: function () {
            if (e.getSelection) {
              var l = e.getSelection();
              if (l.rangeCount > 0) {
                return l.getRangeAt(0);
              }
            } else {
              if (h.selection && h.selection.createRange) {
                return h.selection.createRange();
              }
            }
            return null;
          },
          restoreSelection: function (l) {
            if (l) {
              if (e.getSelection) {
                var m = e.getSelection();
                m.removeAllRanges();
                m.addRange(l);
              } else {
                if (h.selection && l.select) {
                  l.select();
                }
              }
            }
          },
        };
      })(d);
      (function (k) {
        k.Toolbar = function (l, n) {
          this.medium = l;
          var m = h.createElement('div');
          m.innerHTML = this.html;
          this.buttons = n;
          this.element = m.children[0];
          h.body.appendChild(this.element);
          this.active = false;
          this.busy = true;
          this.handledEvents = { scroll: null, mouseup: null, keyup: null };
        };
        k.Toolbar.prototype = {
          fixedClass: 'Medium-toolbar-fixed',
          showClass: 'Medium-toolbar-show',
          hideClass: 'Medium-toolbar-hide',
          html: '<div class="Medium-toolbar">				<div class="Medium-tail-outer">					<div class="Medium-tail-inner"></div>				</div>				<div id="Medium-buttons"></div>				<table id="Medium-options">					<tbody>						<tr>						</tr>					</tbody>				</table>			</div>',
          setup: function () {
            this.handleScroll().handleMouseup().handleKeyup();
          },
          destroy: function () {
            a.removeEvent(e, 'scroll', this.handledEvents.scroll)
              .removeEvent(h, 'mouseup', this.handledEvents.mouseup)
              .removeEvent(h, 'keyup', this.handledEvents.keyup);
          },
          handleScroll: function () {
            var l = this;
            a.addEvent(
              e,
              'scroll',
              (this.handledEvents.scroll = function () {
                if (l.active) {
                  l.goToSelection();
                }
              })
            );
            return this;
          },
          handleMouseup: function () {
            var l = this;
            a.addEvent(
              h,
              'mouseup',
              (this.handledEvents.mouseup = function () {
                if (k.activeElement === l.medium.element && !l.busy) {
                  l.goToSelection();
                }
              })
            );
            return this;
          },
          handleKeyup: function () {
            var l = this;
            a.addEvent(
              h,
              'keyup',
              (this.handledEvents.keyup = function () {
                if (k.activeElement === l.medium.element && !l.busy) {
                  l.goToSelection();
                }
              })
            );
            return this;
          },
          goToSelection: function () {
            var n = this.getHighlighted(),
              o = n.boundary.top - 5,
              m = this.element,
              l = m.style;
            if (e.scrollTop > 0) {
              a.addClass(m, this.fixedClass);
            } else {
              a.removeClass(m, this.fixedClass);
            }
            if (n !== null) {
              if (n.range.startOffset === n.range.endOffset && !n.text) {
                a.removeClass(m, this.showClass).addClass(m, this.hideClass);
                this.active = false;
              } else {
                a.removeClass(m, this.hideClass).removeClass(m, this.showClass);
                l.opacity = 0.01;
                a.addClass(m, this.showClass);
                l.opacity = 1;
                l.top = o - 65 + 'px';
                l.left =
                  n.boundary.left +
                  n.boundary.width / 2 -
                  m.clientWidth / 2 +
                  'px';
                this.active = true;
              }
            }
          },
          getHighlighted: function () {
            var m = e.getSelection(),
              l = m.anchorNode ? m.getRangeAt(0) : false;
            if (!l) {
              return null;
            }
            return {
              selection: m,
              range: l,
              text: a.trim(l.toString()),
              boundary: l.getBoundingClientRect(),
            };
          },
        };
      })(d);
      (function (k) {
        k.Undoable = function (o) {
          var r = this,
            p = o.settings.element,
            s,
            n,
            l = new Undo.Stack(),
            q = Undo.Command.extend({
              constructor: function (t, u) {
                this.oldValue = t;
                this.newValue = u;
              },
              execute: function () {},
              undo: function () {
                p.innerHTML = this.oldValue;
                o.canUndo = l.canUndo();
                o.canRedo = l.canRedo();
                o.dirty = l.dirty();
              },
              redo: function () {
                p.innerHTML = this.newValue;
                o.canUndo = l.canUndo();
                o.canRedo = l.canRedo();
                o.dirty = l.dirty();
              },
            }),
            m = function (u) {
              var t = p.innerHTML;
              if (u) {
                n = p.innerHTML;
                l.execute(new q(n, n));
              } else {
                if (t != n) {
                  if (!r.movingThroughStack) {
                    l.execute(new q(n, t));
                    n = t;
                    o.dirty = l.dirty();
                  }
                  a.triggerEvent(o.settings.element, 'change');
                }
              }
            };
          this.medium = o;
          this.timer = s;
          this.stack = l;
          this.makeUndoable = m;
          this.EditCommand = q;
          this.movingThroughStack = false;
          a.addEvent(p, 'keyup', function (t) {
            if (t.ctrlKey || t.keyCode === f.z) {
              a.preventDefaultEvent(t);
              return;
            }
            clearTimeout(s);
            s = setTimeout(function () {
              m();
            }, 250);
          }).addEvent(p, 'keydown', function (t) {
            if (!t.ctrlKey || t.keyCode !== f.z) {
              r.movingThroughStack = false;
              return;
            }
            a.preventDefaultEvent(t);
            r.movingThroughStack = true;
            if (t.shiftKey) {
              l.canRedo() && l.redo();
            } else {
              l.canUndo() && l.undo();
            }
          });
        };
      })(d);
      d.Utilities = {
        isCommand: function (l, n, m, k) {
          if (
            (l.modifier === 'ctrl' && n.ctrlKey) ||
            (l.modifier === 'cmd' && n.metaKey) ||
            (l.modifier === 'auto' && (n.ctrlKey || n.metaKey))
          ) {
            return m.call();
          } else {
            return k.call();
          }
        },
        isShift: function (m, l, k) {
          if (m.shiftKey) {
            return l.call();
          } else {
            return k.call();
          }
        },
        isModifier: function (l, n, k) {
          var m = l.modifiers[n.keyCode];
          if (m) {
            return k.call(null, m);
          }
          return false;
        },
        special: (function () {
          var k = {};
          k[f.backspace] = true;
          k[f.shift] = true;
          k[f.ctrl] = true;
          k[f.alt] = true;
          k[f['delete']] = true;
          k[f.cmd] = true;
          return k;
        })(),
        isSpecial: function (k) {
          return typeof d.Utilities.special[k.keyCode] !== 'undefined';
        },
        navigational: (function () {
          var k = {};
          k[f.upArrow] = true;
          k[f.downArrow] = true;
          k[f.leftArrow] = true;
          k[f.rightArrow] = true;
          return k;
        })(),
        isNavigational: function (k) {
          return typeof d.Utilities.navigational[k.keyCode] !== 'undefined';
        },
        addEvents: function (o, p, q) {
          var n = 0,
            m,
            r = p.split(' '),
            k = r.length,
            l = d.Utilities;
          for (; n < k; n++) {
            m = r[n];
            if (m.length > 0) {
              l.addEvent(o, m, q);
            }
          }
          return d.Utilities;
        },
        addEvent: function i(l, k, m) {
          if (l.addEventListener) {
            l.addEventListener(k, m, false);
          } else {
            if (l.attachEvent) {
              l.attachEvent('on' + k, m);
            } else {
              l['on' + k] = m;
            }
          }
          return d.Utilities;
        },
        removeEvent: function j(l, k, m) {
          if (l.removeEventListener) {
            l.removeEventListener(k, m, false);
          } else {
            if (l.detachEvent) {
              l.detachEvent('on' + k, m);
            } else {
              l['on' + k] = null;
            }
          }
          return d.Utilities;
        },
        preventDefaultEvent: function (k) {
          if (k.preventDefault) {
            k.preventDefault();
          } else {
            k.returnValue = false;
          }
          return d.Utilities;
        },
        stopPropagation: function (k) {
          k = k || e.event;
          k.cancelBubble = true;
          if (k.stopPropagation !== undefined) {
            k.stopPropagation();
          }
          return d.Utilities;
        },
        isEventSupported: function (m, k) {
          k = 'on' + k;
          var n = h.createElement(m.tagName),
            l = k in n;
          if (!l) {
            n.setAttribute(k, 'return;');
            l = typeof n[k] == 'function';
          }
          n = null;
          return l;
        },
        triggerEvent: function (l, k) {
          var m;
          if (h.createEvent) {
            m = h.createEvent('HTMLEvents');
            m.initEvent(k, true, true);
            m.eventName = k;
            l.dispatchEvent(m);
          } else {
            m = h.createEventObject();
            l.fireEvent('on' + k, m);
          }
          return d.Utilities;
        },
        deepExtend: function (k, n) {
          var m, l;
          for (m in n) {
            if (n.hasOwnProperty(m)) {
              l = n[m];
              if (
                l !== undefined &&
                l !== null &&
                l.constructor !== undefined &&
                l.constructor === Object
              ) {
                k[m] = k[m] || {};
                d.Utilities.deepExtend(k[m], l);
              } else {
                k[m] = l;
              }
            }
          }
          return k;
        },
        pasteHook: function (w, r) {
          w.makeUndoable();
          var o = h.createElement('div'),
            l = w.element,
            v,
            m,
            p,
            x = w.settings,
            t,
            q = h.body,
            u = q.parentNode,
            k = u.scrollTop,
            n = u.scrollLeft;
          o.className = x.cssClasses.pasteHook;
          o.setAttribute('contenteditable', true);
          q.appendChild(o);
          a.selectNode(o);
          u.scrollTop = k;
          u.scrollLeft = n;
          setTimeout(function () {
            t = a.text(o);
            l.focus();
            if (x.maxLength > 0) {
              v = a.text(l);
              m = v.length;
              p = m + t.length;
              if (p > m) {
                t = t.substring(0, x.maxLength - m);
              }
            }
            a.detachNode(o);
            u.scrollTop = k;
            u.scrollLeft = n;
            r(t);
          }, 0);
          return d.Utilities;
        },
        traverseAll: function (n, k, q) {
          var m = n.childNodes,
            p = m.length,
            l = 0,
            o;
          q = q || 1;
          k = k || {};
          if (p > 0) {
            for (; l < p; l++) {
              o = m[l];
              switch (o.nodeType) {
                case 1:
                  d.Utilities.traverseAll(o, k, q + 1);
                  if (k.element !== undefined) {
                    k.element(o, l, q, n);
                  }
                  break;
                case 3:
                  if (k.fragment !== undefined) {
                    k.fragment(o, l, q, n);
                  }
              }
              p = m.length;
              if (o === n.lastChild) {
                l = p;
              }
            }
          }
          return d.Utilities;
        },
        trim: function (k) {
          return k.replace(/^[\s]+|\s+$/g, '');
        },
        arrayContains: function (m, k) {
          var l = m.length;
          while (l--) {
            if (m[l] === k) {
              return true;
            }
          }
          return false;
        },
        addClass: function (l, k) {
          if (l.classList) {
            l.classList.add(k);
          } else {
            l.className += ' ' + k;
          }
          return d.Utilities;
        },
        removeClass: function (l, k) {
          if (l.classList) {
            l.classList.remove(k);
          } else {
            l.className = l.className.replace(
              new RegExp('(^|\b)' + k.split(' ').join('|') + '(\b|$)', 'gi'),
              ' '
            );
          }
          return d.Utilities;
        },
        hasClass: function (l, k) {
          if (l.classList) {
            return l.classList.contains(k);
          } else {
            return new RegExp('(^| )' + k + '( |$)', 'gi').test(l.className);
          }
        },
        isHidden: function (k) {
          return k.offsetWidth === 0 || k.offsetHeight === 0;
        },
        isVisible: function (k) {
          return k.offsetWidth !== 0 || k.offsetHeight !== 0;
        },
        encodeHtml: function (k) {
          return h.createElement('a').appendChild(h.createTextNode(k))
            .parentNode.innerHTML;
        },
        text: function (k, l) {
          if (l !== undefined) {
            if (k === null) {
              return this;
            }
            if (k.textContent !== undefined) {
              k.textContent = l;
            } else {
              k.innerText = l;
            }
            return this;
          } else {
            if (k === null) {
              return this;
            } else {
              if (k.innerText !== undefined) {
                return a.trim(k.innerText);
              } else {
                if (k.textContent !== undefined) {
                  return a.trim(k.textContent);
                } else {
                  if (k.data !== undefined) {
                    return a.trim(k.data);
                  }
                }
              }
            }
          }
          return '';
        },
        changeTag: function (o, m) {
          var l = h.createElement(m),
            n,
            k;
          n = o.firstChild;
          while (n) {
            k = n.nextSibling;
            l.appendChild(n);
            n = k;
          }
          o.parentNode.insertBefore(l, o);
          o.parentNode.removeChild(o);
          return l;
        },
        detachNode: function (k) {
          if (k.parentNode !== null) {
            k.parentNode.removeChild(k);
          }
          return this;
        },
        selectNode: function (m) {
          var k, l;
          m.focus();
          if (h.body.createTextRange) {
            k = h.body.createTextRange();
            k.moveToElementText(m);
            k.select();
          } else {
            if (e.getSelection) {
              l = e.getSelection();
              k = h.createRange();
              k.selectNodeContents(m);
              l.removeAllRanges();
              l.addRange(k);
            }
          }
          return this;
        },
        baseAtCaret: function (m) {
          if (!m.isActive()) {
            return null;
          }
          var n = e.getSelection ? e.getSelection() : document.selection;
          if (n.rangeCount) {
            var l = n.getRangeAt(0),
              k = l.endContainer;
            switch (k.nodeType) {
              case 3:
                if (k.data && k.data.length != l.endOffset) {
                  return false;
                }
                break;
            }
            return k;
          }
          return null;
        },
        atCaret: function (l) {
          var k = this.baseAtCaret(l) || {},
            m = l.element;
          if (k === false) {
            return null;
          }
          while (k && k.parentNode !== m) {
            k = k.parentNode;
          }
          if (k && k.nodeType == 1) {
            return k;
          }
          return null;
        },
        hide: function (k) {
          k.style.display = 'none';
          return d.Utilities;
        },
        show: function (k) {
          k.style.display = '';
          return d.Utilities;
        },
        hideAnim: function (k) {
          k.style.opacity = 1;
          return d.Utilities;
        },
        showAnim: function (k) {
          k.style.opacity = 0.01;
          k.style.display = '';
          return d.Utilities;
        },
        setWindow: function (k) {
          e = k;
          return d.Utilities;
        },
        setDocument: function (k) {
          h = k;
          return d.Utilities;
        },
      };
      g.rangePrototype.insertNodeAtEnd = function (l) {
        var k = this.cloneRange();
        k.collapse(false);
        k.insertNode(l);
        k.detach();
        this.setEndAfter(l);
      };
      return d;
    })(),
    a = b.Utilities;
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return b;
    });
  } else {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = b;
    } else {
      if (typeof this !== 'undefined') {
        this.Medium = b;
      }
    }
  }
}.call(this, window, document));
