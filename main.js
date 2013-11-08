// Generated by CoffeeScript 1.6.3
(function() {
  var $alliterate, DEBUG, PARTS, TWITTER, adnButton, bind, cats, final_name, name_parts, optionsFor, parts_, selects, sourceInfo, tweetButton, _i, _ref, _results;

  rxt.importTags();

  bind = rx.bind;

  DEBUG = false;

  PARTS = 3;

  TWITTER = "killercup";

  parts_ = (function() {
    _results = [];
    for (var _i = 0, _ref = PARTS - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this);

  cats = window.categories;

  name_parts = rx.array(_(cats).chain().keys().sample(PARTS).value());

  $alliterate = null;

  final_name = bind(function() {
    var alliterate, first_char, _ref1, _ref2;
    if (!(name_parts != null ? typeof name_parts.all === "function" ? (_ref1 = name_parts.all()) != null ? _ref1.length : void 0 : void 0 : void 0)) {
      return console.error(name_parts, 'is not cool');
    }
    alliterate = ($alliterate != null ? typeof $alliterate.rx === "function" ? (_ref2 = $alliterate.rx('checked')) != null ? typeof _ref2.get === "function" ? _ref2.get() : void 0 : void 0 : void 0 : void 0) || false;
    first_char = false;
    return name_parts.all().map(function(cat) {
      var random_thing, vals, _ref3;
      vals = (_ref3 = cats[cat]) != null ? _ref3.values : void 0;
      if (!(vals != null ? vals.length : void 0)) {
        return;
      }
      random_thing = _.chain(vals).filter(function(input) {
        if (!alliterate || !first_char) {
          return true;
        } else {
          return input.charAt(0).toUpperCase() === first_char;
        }
      }).sample(1).first().value();
      if (!first_char) {
        first_char = random_thing.charAt(0).toUpperCase();
      }
      return random_thing;
    }).join(" ").split(" ").map(_.str.capitalize).join(" ");
  });

  optionsFor = function(categories, selected) {
    return _(categories).chain().pairs().sortBy(function(a) {
      return a[0];
    }).map(function(_arg) {
      var cat, key;
      key = _arg[0], cat = _arg[1];
      return option({
        value: key,
        selected: key === selected
      }, cat.name);
    }).value();
  };

  sourceInfo = function(categories, selected) {
    var sec;
    if ('' === selected) {
      return "(Will be ignored.)";
    }
    sec = categories != null ? categories[selected] : void 0;
    if ((sec != null ? sec.source : void 0) == null) {
      return console.error(selected, "is not a section of", categories);
    }
    return a({
      href: sec.source
    }, "Source");
  };

  selects = function(name_parts, final_name) {
    return section({
      "class": 'panel panel-default'
    }, [
      form({
        "class": 'panel-body form-inline text-center',
        submit: function(ev) {
          ev.preventDefault();
          return final_name.refresh();
        }
      }, parts_.map(function(i) {
        return div({
          "class": 'form-group'
        }, [
          select({
            "class": 'form-control input-lg',
            change: function() {
              return name_parts.splice(i, 1, this.val());
            }
          }, [
            option({
              value: ''
            }, '– Nope –')
          ].concat(optionsFor(categories, name_parts.at(i)))), div({
            "class": 'help-block'
          }, bind(function() {
            return [sourceInfo(categories, name_parts.at(i))];
          }))
        ]);
      }).concat([
        div({
          "class": 'form-group'
        }, [
          button({
            "class": 'btn btn-lg btn-primary',
            type: 'submit'
          }, [
            i({
              "class": "icon-random"
            }, ' '), "Generate!"
          ]), div({
            "class": 'help-block'
          }, "Click it again!")
        ]), div({
          "class": 'form-group'
        }, [
          label({
            "for": 'alliterate'
          }, [
            $alliterate = input({
              type: 'checkbox',
              id: 'alliterate'
            }), " Alliterate"
          ]), div({
            "class": 'help-block'
          }, "Same first characters")
        ])
      ]))
    ]);
  };

  tweetButton = function(final_name) {
    return a({
      "class": "btn btn-primary",
      target: "_blank",
      href: bind(function() {
        return "https://twitter.com/share?related=" + TWITTER + "&via=" + TWITTER + "&text=" + (encodeURIComponent('Codename: ' + final_name.get())) + "&url=" + window.location.origin;
      })
    }, [
      i({
        "class": "icon-twitter"
      }, ' '), "Tweet"
    ]);
  };

  adnButton = function(final_name) {
    return a({
      "class": "btn btn-default",
      target: "_blank",
      href: bind(function() {
        return "https://alpha.app.net/intent/post/?text=" + (encodeURIComponent('Codename: ' + final_name.get())) + "&url=" + window.location.origin;
      })
    }, [
      i({
        "class": "icon-adn"
      }, ' '), "ADN"
    ]);
  };

  jQuery(function($) {
    if (DEBUG) {
      window.n = name_parts;
      window.f = final_name;
    }
    $('body').addClass('js');
    $('#selects').append(selects(name_parts, final_name));
    $('#final_name').append(span(final_name));
    return $('#share').append(adnButton(final_name)).append(" ").append(tweetButton(final_name));
  });

}).call(this);
