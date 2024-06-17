export function getRandomCarBrand() {
    const carBrands = [
        'Acura',
        'Adler',
        'Adria',
        'AION',
        'Alfa Romeo',
        'Alpina',
        'Aro',
        'Asia',
        'Aston Martin',
        'Audi',
        'Austin',
        'Avia',
        'BAIC',
        'Barkas',
        'BAW',
        'Bentley',
        'Bertone',
        'BMW',
        'Bremach',
        'Brilliance',
        'Bugatti',
        'Buick',
        'BYD',
        'Cadillac',
        'Changan',
        'Chery',
        'Chevrolet',
        'Chrysler ',
        'Citroen ',
        'Cupra',
        'Dacia',
        'Daewoo',
        'DAF',
        'Daihatsu',
        'Datsun',
        'DeLorean',
        'Derways',
        'Dodge',
        'DongFeng',
        'DS',
        'Eagle',
        'Excalibur',
        'Exeed',
        'FAW',
        'Ferrari',
        'Fiat',
        'Fisker',
        'Ford',
        'Foton',
        'FSO',
        'GAC',
        'Geely',
        'Genesis',
        'GMC',
        'Great Wall',
        'Hafei',
        'Haima',
        'Hanjiang',
        'Hanomag',
        'Haval',
        'Hawtai',
        'Hispano-Suiza',
        'Honda ',
        'Honda Everus',
        'Hongqi',
        'Hongxing',
        'HuangHai',
        'Hummer',
        'Hunta',
        'Hyundai',
        'Infiniti',
        'Intrall',
        'Iran Khodro',
        'Isuzu',
        'IVECO',
        'JAC',
        'Jaguar',
        'Jeep',
        'Jetour',
        'Jetta',
        'Jiangling',
        'Kia',
        'Koenigsegg',
        'LADA',
        'Lamborghini',
        'Lancia',
        'Land Rover',
        'LDV',
        'Leapmotor',
        'Lexus',
        'Li',
        'Lifan',
        'Lincoln',
        'Livan',
        'Lotus',
        'Lucid',
        'Mahindra',
        'MAN',
        'Maserati',
        'Maybach',
        'Mazda',
        'McLaren',
        'Mercedes-Benz',
        'Mercury',
        'MG',
        'Microcar',
        'Mini',
        'Mitsubishi',
        'Morris',
        'MPM',
        'Mudan',
        'Neta',
        'Nissan',
        'Nysa',
        'Oldsmobile',
        'Oltcit',
        'Opel',
        'Peugeot',
        'Piaggio',
        'Pinzgauer',
        'Plymouth',
        'Polestar',
        'Pontiac ',
        'Porsche',
        'Proton',
        'Ravon',
        'Renault',
        'Rivian',
        'Roewe',
        'Rolls-Royce',
        'Rover',
        'Saab',
        'Saipa',
        'Santana',
        'Saturn',
        'Scion',
        'Seat',
        'Seres',
        'ShuangHuan',
        'Simca',
        'Skywell',
        'Smart',
        'Spyker',
        'SsangYong',
        'Steyr',
        'StreetScooter',
        'Subaru',
        'Suzuki',
        'Talbot',
        'Tank',
        'Tata',
        'Tatra',
        'Tesla',
        'Tianma',
        'Toyota',
        'Trabant',
        'Triumph',
        'Vauxhall',
        'Volkswagen',
        'Volvo',
        'Vortex',
        'Voyah',
        'Wartburg',
        'Weltmeister',
        'Xin Kai',
        'Xpeng',
        'Zastava',
        'Zeekr',
        'Zotye',
    ];
    const randomIndex = Math.floor(Math.random() * carBrands.length);

    return carBrands[randomIndex];
}
