export function getRandomModelName() {
    const modelNames = [
        'Camry',
        'Accord',
        'Mustang',
        'E-Class',
        'Model S',
        'X5',
        'Q7',
        'Aventador',
        'MX-5',
        'Golf',
        'Outback',
        '911',
        '488',
        'XC90',
        'CR-V',
        '3 Series',
        'Phantom',
    ];
    const randomIndex = Math.floor(Math.random() * modelNames.length);

    return modelNames[randomIndex];
}
