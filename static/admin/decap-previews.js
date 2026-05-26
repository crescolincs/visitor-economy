
 CMS.registerPreviewStyle("https://investlincolnshire.co.uk/css/pg-style.min.min.css");

   // ── Helpers ────────────────────────────────────────────────────────────────
 
  // Resolve an image value: local blob via getAsset, or plain URL string
  function resolveImage(val, getAsset) {
    if (!val) return '';
    var asset = getAsset(val);
    var resolved = asset ? asset.toString() : '';
    // getAsset returns an object whose toString() is empty string when it can't resolve
    return resolved || val;
  }
 
  // Mirror Hugo's modBool: returns true if n is NOT divisible by mod
  function isOdd(n) { return n % 2 !== 0; }
 
  // Immutable JS list → plain array
  function toArray(immList) {
    return immList ? immList.toArray() : [];
  }
 
  // Simple markdown → HTML for inline use (bold, italic, line breaks)
  // For body fields we use widgetFor; this covers blurb/lead strings
  function simpleMarkdown(str) {
    if (!str) return '';
    return str
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
 
  // Down-arrow SVG used in download-block CTAs (mirrors the inline SVG in partials)
  var downArrowSVG = h('svg', {
    className: 'svgdownarrow',
    width: '19.111', height: '30',
    viewBox: '0 0 19.111 30',
    xmlns: 'http://www.w3.org/2000/svg'
  }, h('path', {
    d: 'm19.013 17.489c-0.40757-0.6267-1.7823-0.01084-2.2641 0.56075l-6.0271 7.15v-23.7c0-0.9-0.44595-1.5-1.1149-1.5-0.66893 0-1.1149 0.6-1.1149 1.5v23.7l-6.0271-7.3c-0.47596-0.57648-1.8974-1.0301-2.3433-0.4301-0.44595 0.6 0.44804 2.0801 0.89399 2.6801l7.8109 9.4c0.11149 0.15 0.11149 0.15 0.22298 0.15 0.22298 0.3 0.44595 0.3 0.55744 0.3s0.33446 0 0.44595-0.15c0.11149 0 0.11149-0.15 0.22298-0.15l7.8109-9.4c0.52342-0.6299 1.3008-2.2349 0.92629-2.8108z',
    strokeWidth: '1.2932'
  }));
 
  // Reusable download-block CTA (mirrors the repeated pattern in partials)
  function downloadBlock(label, borderClass, headingClass, linkClass) {
    return h('div', { className: 'download-block ' + borderClass + ' position-relative d-flex justify-content-between' },
      h('div', { className: 'content' },
        h('h3', { className: 'mt-0 mb-1 ' + headingClass }, 'Find out more'),
        h('p', { className: 'm-0 ' + linkClass }, label)
      ),
      h('div', { className: 'icon-wrapper mt-2' },
        h('a', { className: 'full-card-click ' + linkClass, href: '#get-data-form' },
          downArrowSVG
        )
      )
    );
  }

  var companylogoStyles = [
      '#ezpzwrap {border: 1px solid #ccc; overflow-x: scroll; max-width: 1310px; border: none; margin: 0 auto; padding-bottom: 3rem}',
      '#ezpzcontent {display: grid; max-width: 100%; grid-auto-flow: column; grid-auto-columns: 145px; grid-gap: 1.5rem; align-items: center}',
      '#ezpzcontent img{ max-width: 145px;}'
    ].join('\n');
 
  // ── Section renderers ──────────────────────────────────────────────────────
 
  // partials/hero.html
  function renderHero(params, getAsset) {
    var hero = params.get('hero');
    if (!hero || !hero.get('display')) return null;
    var imgSrc = resolveImage(hero.get('heroImg'), getAsset);
    return h('section', { className: 'section_header-50-50' },
      h('div', { className: 'container' },
        h('div', { className: 'row d-flex flex-row' },
          h('div', { className: 'col-12 col-lg-5 pe-lg-4 d-flex flex-column justify-content-center align-items-center' },
            h('h1', { className: 'text-sector-mid' }, hero.get('heading') || ''),
            h('div', {
              className: 'p-large',
              dangerouslySetInnerHTML: { __html: simpleMarkdown(hero.get('blurb')) }
            })
          ),
          h('div', { className: 'col-12 col-lg-7 mt-sm-5' },
            h('div', { className: 'img-wrapper pl10' },
              imgSrc ? h('img', { src: imgSrc, alt: 'Sector image' }) : null
            )
          )
        )
      )
    );
  }
 
  // partials/mainsectors/investmentopportunity.html
  function renderInvestmentOpportunity(params, getAsset) {
    var io = params.get('investmentopportunity');
    if (!io || !io.get('display')) return null;
    var offers = toArray(io.get('offer'));
    var len = offers.length;
 
    var offerCols = offers.map(function(offer, index) {
      var isLast = (index + 1 === len);
      var isOddCount = isOdd(index + 1);
      var colClass = (isLast && isOddCount) ? 'col-md-6 offset-md-3' : 'col-md-6';
      var iconSrc = resolveImage(offer.get('icon'), getAsset);
      return h('div', { className: colClass, key: index },
        h('div', { className: 'opp-wrapper d-flex align-items-center' },
          h('div', { className: 'icon-wrapper' },
            iconSrc ? h('img', { src: iconSrc }) : null
          ),
          h('div', { className: 'text-wrapper' },
            h('h3', {}, offer.get('title') || ''),
            h('p', {}, offer.get('description') || '')
          )
        )
      );
    });
 
    return h('section', { className: 'section_investment-opportunity-block' },
      h('div', { className: 'container' },
        h('div', { className: 'row' },
          h('div', { className: 'col-12' },
            h('h2', { className: 'h2-large text-dark-blue' }, io.get('heading') || ''),
            h('p', {}, io.get('subheading') || '')
          )
        ),
        h('div', { className: 'container' },
          h('div', { className: 'row xrow-cols-sm-1 xrow-cols-md-2' }, offerCols)
        )
      )
    );
  }
 
  // partials/mainsectors/marketopportunity.html
  function renderMarketOpportunity(params) {
    var mo = params.get('marketopportunity');
    if (!mo || !mo.get('display')) return null;
    var benefits = toArray(mo.get('benefits'));
    var stats = toArray(mo.get('stats'));
    var statsLen = stats.length;
 
    var benefitItems = benefits.map(function(b, i) {
      return h('li', { key: i },
        h('span', { className: 'text-sector-mid' }, b.get('benefit') || ''),
        ' ' + (b.get('feature') || '')
      );
    });
 
    var statBlocks = stats.map(function(stat, index) {
      var isLast = (index + 1 === statsLen);
      var isOddCount = isOdd(index + 1);
      var clr = stat.get('clrscheme') || '';
      var textColor = stat.get('textcolor') || '';
      var colClass = (isLast && isOddCount)
        ? 'stat-block stat-consumers col-8 col-lg-6 offset-lg-3 bg-sector-' + clr
        : 'stat-block stat-consumers col-8 col-lg-5 bg-sector-' + clr;
      return h('div', { className: colClass, key: index },
        h('p', { className: 'label text-' + textColor }, stat.get('name') || ''),
        h('hr', { className: 'text-' + textColor }),
        h('p', { className: 'stat text-' + textColor },
          h('span', {}, stat.get('size') || ''),
          h('span', {}, stat.get('measure') || ''),
          h('span', {}, stat.get('when') || '')
        )
      );
    });
 
    return h('section', { className: 'section_list-and-stats mb-5' },
      h('div', { className: 'container' },
        h('div', { className: 'row' },
          // Left column
          h('div', { className: 'col-12 col-lg-5 pe-3 pe-lg-0' },
            h('h2', { className: 'h2-small text-sector-mid' }, mo.get('heading') || ''),
            h('p', {
              className: 'lead-text text-sector-dark p-large',
              dangerouslySetInnerHTML: { __html: simpleMarkdown(mo.get('lead')) }
            }),
            h('ul', {}, benefitItems),
            downloadBlock(mo.get('ctatext') || '', 'border-sector-dark', 'text-sector-dark', 'text-sector-mid')
          ),
          // Right column — stats grid
          h('div', { className: 'col-12 col-lg-7 d-flex align-items-center mt-4 mt-lg-0' },
            h('div', { className: 'row justify-content-center align-items-center stats-blocks' },
              statBlocks
            )
          )
        )
      )
    );
  }
 
  // partials/mainsectors/offerfeatures.html
  // Hugo alternates image left/right: odd index (1st,3rd…) → image right; even → image left
  // modBool(index+1, 2) is false when (index+1) is odd, true when even
  // "if not modBool" → runs when index+1 is ODD → image in order-lg-1 (left)
  function renderOfferFeatures(params, getAsset) {
    var of_ = params.get('offerfeatures');
    if (!of_ || !of_.get('display')) return null;
    var features = toArray(of_.get('features'));
 
    var sections = features.map(function(feature, index) {
      var imgSrc = resolveImage(feature.get('image'), getAsset);
      // index+1 odd  → image col: order-lg-1 (left),  text col: offset-lg-1 order-lg-2 (right)
      // index+1 even → image col: order-lg-1 (right, no offset), text col: order-lg-1 (left)
      var oneBasedOdd = isOdd(index + 1);
      var imgColClass  = oneBasedOdd
        ? 'col-12 col-lg-6 order-lg-1 mb-4 mb-lg-0'
        : 'col-12 col-lg-6 offset-lg-1 order-lg-2 mb-4 mb-lg-0';
      var textColClass = oneBasedOdd
        ? 'col-12 col-lg-5 offset-lg-1 order-lg-2'
        : 'col-12 col-lg-5 order-lg-1';
 
      return h('section', { className: 'section_50-50-image-content-download mb-5', key: index },
        h('div', { className: 'container' },
          h('div', { className: 'row' },
            h('div', { className: imgColClass, style: { overflow: 'hidden' } },
              imgSrc
                ? h('img', { src: imgSrc, alt: '', style: { objectFit: 'contain', height: '100%' } })
                : null
            ),
            h('div', { className: textColClass },
              h('h2', { className: 'h2-small text-sector-mid mt-0' }, feature.get('heading') || ''),
              h('p', { className: 'lead-text text-sector-dark p-large' }, feature.get('lead') || ''),
              h('p', {
                dangerouslySetInnerHTML: { __html: simpleMarkdown(feature.get('body')) }
              }),
              downloadBlock(feature.get('ctatext') || '', 'border-sector-dark', 'text-sector-dark', 'text-sector-mid')
            )
          )
        )
      );
    });
 
    return h('div', {}, sections);
  }
 
  // partials/mainsectors/support.html
  function renderSupport(params, getAsset) {
    var sup = params.get('support');
    if (!sup || !sup.get('display')) return null;
    var imgSrc = resolveImage(sup.get('image'), getAsset);
    return h('section', { className: 'section_full-width-banner' },
      h('div', { className: 'container' },
        h('div', { className: 'row' },
          h('div', { className: 'col-12 col-lg-6 pe-5' },
            h('h2', { className: 'h2-small text-white' }, sup.get('heading') || ''),
            h('p', {}, sup.get('lead') || ''),
            downloadBlock(sup.get('ctatext') || '', 'border-sector-light', 'text-sector-light', 'text-sector-light')
          ),
          h('div', { className: 'col-12 col-lg-6' },
            h('div', { className: 'img-wrapper' },
              imgSrc ? h('img', { src: imgSrc, alt: '', loading: 'lazy' }) : null
            )
          )
        )
      )
    );
  }
 
  // partials/mainsectors/logogrid.html
  function renderLogoGrid(params, getAsset) {
    var logos = params.get('companylogos');
    if (!logos || !logos.get('display')) return null;
    var companies = toArray(logos.get('companies'));
 
    var logoImgs = companies.map(function(company, i) {
      var src = resolveImage(company.get('logo'), getAsset);
      return src
        ? h('img', { src: src, alt: company.get('name') || '', key: i })
        : null;
    });
 
    return h('section', { className: 'section_logo-grid' },
      h('div', { className: 'container hzwrapper' },
        h('div', { className: 'row' },
          h('div', { className: 'col-12' },
            h('h2', { className: 'h2-small text-dark-blue text-center' }, logos.get('heading') || ''),
            h('p', { className: 'text-center p-large' }, logos.get('subheading') || '')
          )
        ),
        h('div', { id: 'ezpzwrap' },
          h('div', { className: 'scroller hidescrollbar', id: 'ezpzcontent' },
            logoImgs
          )
        )
      )
    );
  }
 
  // partials/mainsectors/cta.html  (sectorCTA)
  function renderCTA(params, getAsset) {
    var cta = params.get('sectorCTA');
    if (!cta || !cta.get('display')) return null;
 
    var bgcolor      = cta.get('bgcolor')       || 'dark';
    var headingcolor = cta.get('headingcolor')  || 'light';
    var licolour     = cta.get('contentscolour') || 'text-white';
    var imgSrc       = resolveImage(cta.get('image'), getAsset);
    var footerImg    = resolveImage(cta.get('footerimg'), getAsset);
    var highlights   = toArray(cta.get('brochurecontents'));
 
    var bulletItems = highlights.map(function(item, i) {
      return h('li', { className: licolour, key: i }, item.get('highlight') || '');
    });
 
    return h('section', { className: 'section_get-data-form bg-sector-' + bgcolor, id: 'get-data-form' },
      h('div', { className: 'container' },
        h('div', { className: 'row justify-content-center' },
          h('div', { className: 'col-12 col-lg-8' },
            h('h2', { className: 'h2-large text-sector-' + headingcolor + ' text-center' }, cta.get('heading') || ''),
            h('p', { className: licolour + ' text-center p-large' }, cta.get('lead') || '')
          ),
          h('div', { className: 'col-12 col-lg-12' },
            h('div', { className: 'form-content-wrapper d-lg-flex' },
              h('div', { className: 'col-12 col-lg-2' }),
              h('div', { className: 'col-12 col-lg-4 d-flex d-lg-block justify-content-center' },
                h('ul', {}, bulletItems)
              ),
              h('div', { className: 'col-12 col-lg-6 d-flex align-items-center' },
                h('div', { className: 'img-wrapper', style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
                  imgSrc ? h('img', { src: imgSrc, alt: '', loading: 'lazy' }) : null,
                  h('button', { className: 'btn btn-submit mt-3', type: 'button' }, 'Download Brochure')
                )
              )
            ),
            footerImg
              ? h('div', { className: 'img-wrapper' },
                  h('img', { src: footerImg, alt: '' })
                )
              : null
          )
        )
      )
    );
  }
 
  // ── Main preview component ─────────────────────────────────────────────────
 
  var HomePreview = createClass({
    render: function() {
      var entry    = this.props.entry;
      var getAsset = this.props.getAsset;
      var params   = entry.get('data');
      var sector   = params.get('sector') || '';
 
      return h('main', { id: 'main', className: 'page_home sector_' + sector },
        h('style', {}, companylogoStyles),
        renderHero(params, getAsset),
        renderInvestmentOpportunity(params, getAsset),
        renderMarketOpportunity(params),
        renderOfferFeatures(params, getAsset),
        renderSupport(params, getAsset),
        renderLogoGrid(params, getAsset),
        renderCTA(params, getAsset)
      );
    }
  });
 
  CMS.registerPreviewTemplate("home", HomePreview);


  var PostPreview = createClass({
    render: function() {
      var entry    = this.props.entry;
      var getAsset = this.props.getAsset;
 
      // Field values
      var title    = entry.getIn(['data', 'title'])    || '';
      var date     = entry.getIn(['data', 'date']);
      var intro    = entry.getIn(['data', 'intro']);
      var imageVal = entry.getIn(['data', 'image']);
      var tags     = entry.getIn(['data', 'tags']);
      var sources  = entry.getIn(['data', 'sources']);
      var sector   = (tags && tags.size > 0) ? tags.get(0).toLowerCase() : '';
 
      // Resolve image asset (handles local blob uploads)
      var imageSrc = imageVal ? getAsset(imageVal).toString() : null;
 
      // Format publish date
      var formattedDate = '';
      if (date) {
        try {
          formattedDate = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric'
          });
        } catch(e) { formattedDate = date; }
      }
 
      // Sources list
      var sourcesEl = null;
      if (sources && sources.size > 0) {
        sourcesEl = h('div', { className: 'sources' },
          h('ol', {},
            sources.map(function(src, i) {
              var url      = src.get('url');
              var urlTitle = src.get('urltitle') || url;
              var source   = src.get('source');
              var refno    = src.get('refno');
              return h('li', { key: i },
                refno  ? h('span', {}, refno + '. ') : null,
                source ? h('span', {}, source + (url ? ' — ' : '')) : null,
                url    ? h('a', { href: url, target: '_blank' }, urlTitle) : null
              );
            }).toArray()
          )
        );
      }
 
      return h('main', { id: 'main', className: 'sector_' + sector },
 
        // ── Article Header (mirrors section.section_article-header) ──────
        h('section', { className: 'section_article-header mb-5' },
          h('div', { className: 'container' },
            h('div', { className: 'row' },
              h('div', { className: 'col-12' },
 
                // Sector / tags label
                tags && tags.size > 0
                  ? h('p', { className: 'sector text-sector-mid' }, tags.join(', '))
                  : null,
 
                // Title
                h('h1', { className: 'text-sector-mid' }, title),
 
                // Publish date
                formattedDate
                  ? h('p', { className: 'article-date' }, formattedDate)
                  : null,
 
                // Hero image
                imageSrc
                  ? h('div', { className: 'img-wrapper' },
                      h('img', { src: imageSrc, alt: '' })
                    )
                  : null,
 
                // Intro blurb
                intro
                  ? h('p', { className: 'intro-blurb' }, intro)
                  : null
              )
            )
          )
        ),
 
        // ── Article Body (mirrors section.section_article-text) ──────────
        h('section', { className: 'section_article-text' },
          h('div', { className: 'container' },
            h('div', { className: 'row justify-content-center' },
              h('div', { className: 'col-12 col-lg-8' },
                h('div', { className: 'text-dark-blue mb-5 contentblock' },
                  this.props.widgetFor('body')
                ),
                sourcesEl
              )
            )
          )
        )
 
      );
    }
  });
 


  CMS.registerPreviewTemplate("articles", PostPreview);
  