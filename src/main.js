const minhaPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => {resolve('ok')}, 2000);
});

async function executaPromise(){
    console.log(await minhaPromise()); // executará após 2 + 2 segundos
    console.log(await minhaPromise()); // executará após 2 + 2 + 2 segundos
    console.log(await minhaPromise()); // executará após 2 segundos
    console.log('Isso está após as promises e dentro da função, e será executado após as promises'); // só será executado depois de todas as funções com await serem executadas
}

executaPromise();

console.log('Isso está após as promises e fora da função, e será executado antes das promises');