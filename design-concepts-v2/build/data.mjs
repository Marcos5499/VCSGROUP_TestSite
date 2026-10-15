// Shared content for all three concepts. Everything here comes from the VCS Group
// Company Profile (April 2025) or the Group overview supplied by the client.
// Websites are only listed where the profile names one.

export const group = {
  name: 'VCS Group',
  founded: '2 December 1991',
  founder: 'Marc Houareau',
  people: 'nearly 300',
  companies: 12,
  sectors: 8,
  address: ['VCS Building, Le Chantier', 'PO Box 1000, Victoria', 'Mahé, Seychelles'],
  tel: '+248 4676 000',
  fax: '+248 4324 056',
  email: 'info@vcs.sc',
  web: 'https://www.vcs.sc',
  purpose:
    'We help organisations focus on their core activities, using advanced technology, superior products and professional services to raise productivity, efficiency and access to markets.',
  story: [
    'The VCS Group began on 2 December 1991, when Marc Houareau incorporated Victoria Computer Services as the first computer services company in Seychelles. VCS went on to develop the first software suite used in the country’s tourism industry, and helped bring the internet to Seychelles through its subsidiary, Atlas Seychelles Limited.',
    'Over three decades the Group grew by founding and acquiring companies. Today it has twelve companies and nearly 300 people, working in eight sectors of the Seychelles economy, and represents some of the world’s best-known brands, from BMW and Honda to Microsoft, Cisco, Xerox, Bacardi and Diageo.',
    'Its shareholders also hold investments in cornerstone national enterprises, including H. Savy Insurance, Seychelles Breweries, Cable & Wireless Seychelles and Seychelles Commercial Bank.'
  ],
  values: [
    ['Caring', 'Respectful relations with customers, partners, suppliers, employees and communities.'],
    ['Innovation', 'Making changes that create differences and improvements throughout all divisions.'],
    ['Loyalty', 'Working together with employees, partners, suppliers and customers to solve problems.'],
    ['Knowledge', 'Being experts in our fields.'],
    ['Integrity', 'Honesty and integrity at all times.'],
    ['Commitment', 'Dedicated to the success of our customers, partners, employees and shareholders.']
  ],
  leadership: [
    ['Marc Houareau', 'Executive Chairman'],
    ['Gilbert Lebon', 'Managing Director'],
    ['Guy Savy', 'Director'],
    ['Liselle Fock-Tave', 'Chief Finance Officer'],
    ['Irin Camille', 'HR & Administration Manager'],
    ['Guilda Hoareau', 'Finance Manager']
  ],
  milestones: [
    [1991, 'Victoria Computer Services is founded, the first computer services company in Seychelles.'],
    [2001, 'The Group acquires Honda (Seychelles).'],
    [2004, 'Executive Motors introduces BMW to Seychelles. SeaShell Travel begins operating.'],
    [2005, 'Switch is founded as a full-service marketing agency.'],
    [2007, 'Savy & Sons is founded. Chevrolet joins Executive Motors.'],
    [2008, 'Executive Cars Rental is incorporated.'],
    [2009, 'Crown Motors brings the first GWM cars to Seychelles.'],
    [2010, 'Printhouse is set up at Providence on 1 November.'],
    [2011, 'TODAY in Seychelles launches on 1 March, the first independent daily colour newspaper.'],
    [2012, 'Pure 90.7 FM goes on air in August, the first commercial private radio station. Crown Motors becomes the Peugeot dealer.'],
    [2017, 'Executive Motors becomes the authorised Isuzu Truck dealer.'],
    [2021, 'Today Publishers launches the Sunday magazine OZORDI Dimans.'],
    [2023, 'Crown Motors becomes the official HAVAL distributor. BMW electric vehicles arrive.']
  ]
};

// Each sector: slug, name, short line, intro, facts (real figures), companies, brands, contacts.
export const sectors = [
  {
    slug: 'ict', name: 'ICT', long: 'Information & Communications Technology', art: 'network',
    line: 'Where the Group began, in 1991.',
    intro: 'Victoria Computer Services is the leading IT company in Seychelles. It supplies software, hardware and IT services to banks, hotels, airlines, restaurants, corporate service providers, schools, government ministries, parastatals and small businesses, and keeps them running with local support.',
    more: 'Companies depend on IT more than ever. VCS helps them choose the right technology, protect what they have already invested and get support they can rely on.',
    facts: [['1991', 'Founded at Le Chantier, Victoria, as the first computer services company in the country.'], ['1st', 'Software suite developed in Seychelles, written for the tourism industry.'], ['16', 'Technology partners, from Microsoft and Cisco to Fortinet and Veeam.']],
    services: ['Enterprise technology infrastructure', 'Software solutions', 'Backup and disaster recovery with SCloud', 'IT support and managed services', 'Xerox Business Services'],
    companies: [
      { name: 'Victoria Computer Services (VCS)', since: 1991, text: 'Software, hardware and IT services for the country’s public and private sector, backed by global vendors and a skilled local team.', web: 'https://www.vcs.sc', webLabel: 'vcs.sc', tel: '+248 4676 000', email: 'info@vcs.sc' },
      { name: 'SCloud', since: null, text: 'Backup and disaster recovery from VCS, so that a failure does not become a lost business day.', web: 'https://www.vcs.sc', webLabel: 'vcs.sc', tel: '+248 4676 000', email: 'info@vcs.sc' }
    ],
    brands: ['Microsoft', 'HP', 'Xerox', 'Cisco', 'Sophos', 'Adobe', 'Fortinet', 'QNAP', 'Dell', 'Veeam', 'Symantec', 'Panasonic', 'Mimaki', 'GFI', 'Cyberoam', 'ioSafe']
  },
  {
    slug: 'automobile', name: 'Automobile', long: 'Automobile', art: 'car',
    line: 'Seven world brands, one service centre.',
    intro: 'The Group sells and services Honda, BMW, Chevrolet, Isuzu, Peugeot, GWM and HAVAL vehicles in Seychelles. Its technicians are factory trained and work with the computer-based diagnostic systems of every brand it represents.',
    more: 'Sales, service and spare parts sit together at the Autoland Complex on Avenue d’Arhoa, Providence Industrial Estate.',
    facts: [['7', 'Vehicle brands represented: Honda, BMW, Chevrolet, Isuzu, Peugeot, GWM and HAVAL.'], ['2001', 'The year Honda (Seychelles) joined the Group.'], ['2004', 'The year Executive Motors introduced BMW to Seychelles.']],
    services: ['New vehicle sales', 'Authorised after-sales service', 'Genuine spare parts', 'Computer-based diagnostics', 'Honda motorcycles and power products'],
    companies: [
      { name: 'Autoland', since: null, text: 'The authorised after-sales service centre, garage and spare parts centre for Honda, BMW, Chevrolet, Isuzu, Peugeot and GWM.', web: null, tel: '+248 4389 444', email: 'info@autoland.sc' },
      { name: 'Honda (Seychelles)', since: 2001, text: 'EHW (Seychelles) Limited, the exclusive authorised dealer for Honda cars, motorcycles and power products.', web: 'https://www.facebook.com/hondaseychelles', webLabel: 'Facebook', tel: '+248 4389 444', email: 'info@autoland.sc' },
      { name: 'Executive Motors', since: 2004, text: 'BMW since 2004, Chevrolet since 2007, Isuzu KB pickups since 2012 and Isuzu Trucks since 2017.', web: 'https://www.facebook.com/executivemotors', webLabel: 'Facebook', tel: '+248 4389 444', email: 'info@autoland.sc' },
      { name: 'Crown Motors', since: 2009, text: 'Brought the first GWM cars to Seychelles in 2009, Peugeot dealer since 2012 and HAVAL distributor since 2023.', web: null, tel: '+248 4389 444', email: 'info@autoland.sc' }
    ],
    brands: ['Honda', 'BMW', 'Chevrolet', 'Isuzu', 'Peugeot', 'GWM', 'HAVAL']
  },
  {
    slug: 'distribution', name: 'Distribution', long: 'Import, Distribution & Warehousing', art: 'bottles',
    line: 'A trading name from the 1930s.',
    intro: 'Savy & Sons is the leading beverage wholesaler in Seychelles. It imports wines, spirits and beverages and supplies the country’s major hotels, restaurants, bars and shops.',
    more: 'Its origins go back to the 1930s and Harry Savy & Company, one of the first import and wholesale trading houses in Seychelles. Savy & Sons itself was founded in 2007.',
    facts: [['1930s', 'Harry Savy & Company opens, one of the first import and wholesale traders in Seychelles.'], ['2007', 'Savy & Sons is founded as a wine, spirits and beverage importer.'], ['3', 'Islands served by its own distribution network: Mahé, Praslin and La Digue.']],
    services: ['Import of wines, spirits and beverages', 'Wholesale to hotels, restaurants and bars', 'Retail supply', 'Distribution on Mahé, Praslin and La Digue'],
    companies: [
      { name: 'Savy & Sons', since: 2007, text: 'Official distributor in Seychelles for Barton & Guestier wines, Bacardi, Bavaria beer, Diageo, Laurent-Perrier Champagne and Bardinet.', web: null, tel: '+248 4676 000', email: 'info@vcs.sc' }
    ],
    brands: ['Barton & Guestier', 'Bacardi', 'Bavaria', 'Diageo', 'Laurent-Perrier', 'Bardinet']
  },
  {
    slug: 'tourism', name: 'Tourism', long: 'Travel & Tourism', art: 'boat',
    line: 'By air, by road and at sea.',
    intro: 'Three companies look after travellers to and from Seychelles: an IATA-accredited travel agency, a chauffeur and car rental company, and a sport-fishing and cruising charter on board the Island Star.',
    more: 'SeaShell Travel is regularly ranked by the major airlines as one of the best-performing agencies in the country, and offers its service 24 hours a day.',
    facts: [['14', 'Airlines ticketed by SeaShell Travel, including Air Seychelles, Emirates, Qatar Airways and British Airways.'], ['50', 'Vehicles in the Executive Cars fleet: BMW and Honda SUVs, sedans, seven-seaters and hybrids.'], ['58 ft', 'Island Star, the Viking sport-fishing vessel of Island Charters.']],
    services: ['Air ticketing for every airline serving Seychelles', 'Chauffeur-driven limousine service', 'Private transfers and self-drive rental', 'Corporate fleet leasing', 'Sport fishing and coastal cruising'],
    companies: [
      { name: 'SeaShell Travel', since: 2004, text: 'A fully accredited IATA agency handling tickets for all airlines that fly to Seychelles, with a team focused on service around the clock.', web: 'https://www.seashelltravel.sc', webLabel: 'seashelltravel.sc', tel: '+248 4324 361', email: 'ssticket@seychelles.net' },
      { name: 'Executive Cars Rental', since: 2008, text: 'Chauffeur-driven limousines, private transfers, self-drive rental and company fleet leasing with BMW and Honda vehicles.', web: 'https://www.executivecars.sc', webLabel: 'executivecars.sc', tel: '+248 2526 162', email: 'info@executivecars.sc' },
      { name: 'Island Charters', since: null, text: 'Sport fishing and coastal cruising on the Island Star, crewed by people who know these waters. Its team has won many national fishing competitions and practises catch and release.', web: 'https://www.vcs.sc', webLabel: 'vcs.sc', tel: '+248 4676 000', email: 'info@vcs.sc' }
    ],
    brands: ['Air Seychelles', 'Emirates', 'Qatar Airways', 'Etihad Airways', 'British Airways', 'Air France', 'Turkish Airlines', 'Kenya Airways', 'Ethiopian Airlines', 'Air Mauritius', 'SriLankan Airlines', 'South African Airways', 'Austrian Airlines', 'Air Austral']
  },
  {
    slug: 'printing', name: 'Printing', long: 'Printing & Publishing', art: 'press',
    line: 'The largest private printer in Seychelles.',
    intro: 'Printhouse is the largest privately owned printing firm in Seychelles. It runs Heidelberg offset colour presses alongside Xerox and Mimaki digital presses, so it can handle long runs and short, fast jobs in one place.',
    more: 'Printhouse was the first in Seychelles to print with chemical-free computer-to-plate technology, and it prints MICR cheque books for the Central Bank of Seychelles and every private bank in the country. iMedia publishes the official Seychelles directory.',
    facts: [['1,700 m²', 'Of factory floor at Avenue d’Arhoa, Providence Industrial Estate.'], ['50', 'Experienced people at Printhouse.'], ['4', 'Editions of the Seychelles Directory produced by iMedia.']],
    services: ['Offset colour printing', 'Short-run digital printing', 'Security printing and MICR cheques', 'Stationery and large format', 'Directories and publishing'],
    companies: [
      { name: 'Printhouse', since: 2010, text: 'Set up on 1 November 2010 after acquiring Modern Printing Services, which had over 30 years of experience in offset printing and stationery.', web: 'https://www.facebook.com/printhouse', webLabel: 'Facebook', tel: '+248 4374 888', email: 'info@printhouse.sc' },
      { name: 'iMedia', since: null, text: 'Marketing, advertising and publishing. Produces the Seychelles Directory, runs the official Yellow Pages and has published books and music by Seychellois artists.', web: 'https://www.yellowpages.sc', webLabel: 'yellowpages.sc', tel: '+248 4676 000', email: 'info@vcs.sc' }
    ],
    brands: ['Heidelberg', 'Xerox', 'Mimaki', 'Duplo', 'Polar', 'Glunz & Jensen']
  },
  {
    slug: 'media', name: 'Media', long: 'Media & Marketing', art: 'mast',
    line: 'A newspaper, a radio station and an agency.',
    intro: 'The Group publishes the country’s first independent daily colour newspaper, runs its first commercial private radio station, and owns a full-service marketing agency that works for companies, government and non-profits.',
    more: 'TODAY in Seychelles is also published in a digital edition, eTODAY, alongside the quarterly marine magazine SEALIFE and the Sunday magazine OZORDI Dimans.',
    facts: [['2005', 'Switch is founded as a full-service marketing agency.'], ['2011', 'TODAY in Seychelles prints its first edition on 1 March.'], ['24/7', 'Pure 90.7 FM broadcasts music, news and sport around the clock, and online.']],
    services: ['Website design and development', 'Digital marketing and SEO', 'Branding and graphic design', 'Online market surveys', 'Print and radio advertising'],
    companies: [
      { name: 'Switch', since: 2005, text: 'Digital marketing strategists, web designers, graphic designers, social media specialists and writers, delivering projects of every size.', web: null, tel: '+248 4676 000', email: 'info@vcs.sc' },
      { name: 'TODAY in Seychelles', since: 2011, text: 'Today Publishers’ daily colour newspaper, with eTODAY, SEALIFE and OZORDI Dimans.', web: null, tel: '+248 4676 000', email: 'info@vcs.sc' },
      { name: 'Pure 90.7 FM', since: 2012, text: 'Hits from the 1990s to today, with entertainment, local and international news and sport. Heard worldwide online.', web: 'https://purefm.sc', webLabel: 'purefm.sc', tel: '+248 4676 000', email: 'info@vcs.sc' }
    ],
    brands: ['TODAY in Seychelles', 'eTODAY', 'SEALIFE', 'OZORDI Dimans', 'Pure 90.7 FM', 'Switch']
  },
  {
    slug: 'investment', name: 'Investment', long: 'Investment', art: 'clock',
    line: 'Shareholders in the nation’s cornerstones.',
    intro: 'The Group’s shareholders hold investments in companies at the centre of the Seychelles economy, in insurance, banking, telecommunications, brewing, property and marine services.',
    more: 'These long-term holdings sit alongside the Group’s operating companies and reflect its commitment to the country’s growth.',
    facts: [['10', 'Companies in which the shareholders hold investments, as listed in the 2025 company profile.'], ['12', 'Operating companies in the Group alongside these holdings.'], ['1930s', 'The trading roots of H. Savy & Company.']],
    services: [],
    companies: [
      { name: 'H. Savy Insurance Company', since: null, text: 'Insurance.', web: null },
      { name: 'H. Savy & Company', since: null, text: 'Trading.', web: null },
      { name: 'Seychelles Breweries', since: null, text: 'Brewing and beverages.', web: null },
      { name: 'Seychelles Commercial Bank', since: null, text: 'Banking.', web: null },
      { name: 'Cable & Wireless Seychelles', since: null, text: 'Telecommunications.', web: null },
      { name: 'Le Chantier Development Company', since: null, text: 'Property development.', web: null },
      { name: 'Land Marine Limited', since: null, text: 'Marine services.', web: null },
      { name: 'Sugyma Limited', since: null, text: 'Holding named in the 2025 profile.', web: null },
      { name: 'Zozo Bleu Limited', since: null, text: 'Holding named in the 2025 profile.', web: null }
    ],
    brands: []
  }
];

// Contact book for the contact page.
export const contacts = [
  { division: 'Head office & ICT', company: 'VCS Group', lines: ['VCS Building, Le Chantier', 'Victoria, Mahé'], tel: '+248 4676 000', email: 'info@vcs.sc', web: 'https://www.vcs.sc', webLabel: 'vcs.sc' },
  { division: 'Automobile', company: 'Autoland', lines: ['Autoland Complex, Avenue d’Arhoa', 'Providence, Mahé'], tel: '+248 4389 444', email: 'info@autoland.sc' },
  { division: 'Printing', company: 'Printhouse', lines: ['Avenue d’Arhoa', 'Providence, Mahé'], tel: '+248 4374 888', email: 'info@printhouse.sc' },
  { division: 'Tourism', company: 'SeaShell Travel', lines: ['PO Box 349, Le Chantier', 'Mahé'], tel: '+248 4324 361', email: 'ssticket@seychelles.net', web: 'https://www.seashelltravel.sc', webLabel: 'seashelltravel.sc' },
  { division: 'Tourism', company: 'Executive Cars', lines: ['Autoland Complex, Avenue d’Arhoa', 'Providence, Mahé'], tel: '+248 2526 162', email: 'info@executivecars.sc', web: 'https://www.executivecars.sc', webLabel: 'executivecars.sc' },
  { division: 'Tourism', company: 'Island Charters', lines: ['VCS Building, Le Chantier', 'Victoria, Mahé'], tel: '+248 4676 000', email: 'info@vcs.sc' }
];

// "What do you need?" finder: real tasks mapped to the company that handles them.
export const needs = [
  ['Service or repair my car', 'automobile', 'Autoland'],
  ['Buy a new BMW', 'automobile', 'Executive Motors'],
  ['Buy a Honda car or motorcycle', 'automobile', 'Honda (Seychelles)'],
  ['Book a flight', 'tourism', 'SeaShell Travel'],
  ['Hire a car or a chauffeur', 'tourism', 'Executive Cars Rental'],
  ['Go deep-sea fishing', 'tourism', 'Island Charters'],
  ['Upgrade our IT or network', 'ict', 'Victoria Computer Services (VCS)'],
  ['Back up our business data', 'ict', 'SCloud'],
  ['Print brochures or cheque books', 'printing', 'Printhouse'],
  ['Find a business in Seychelles', 'printing', 'iMedia'],
  ['Stock wines and spirits', 'distribution', 'Savy & Sons'],
  ['Build a website or campaign', 'media', 'Switch'],
  ['Advertise on the radio', 'media', 'Pure 90.7 FM']
];

export const sectorBySlug = Object.fromEntries(sectors.map((s) => [s.slug, s]));
export const findCompany = (slug, name) => sectorBySlug[slug].companies.find((c) => c.name === name);
