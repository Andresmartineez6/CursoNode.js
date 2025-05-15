import { defineConfig } from 'vitest/config';
import path from 'path';
import { appendFile } from 'fs';

export default defineConfig ({
    test:{
        globals:true,
        environment: 'node',
        // ** -> significa lo que sea , osea metete en tests y buscas en todo lo que sea que haya el test.ts
        include: ['tests/**/*.test.ts'],
    },
    //hay que crear unos alias para que el vitest pueda usar los imports, esto si test estubiese dentro de src no habria que hacerlo, pero como esta fuera es necesario para redirigirlo a las subcarpetas
    resolve:{
        alias:{
            application: path.resolve(__dirname, 'src/application'),
            domain: path.resolve(__dirname, 'src/domain'),
            infrastructure: path.resolve(__dirname, 'src/infrastructure'),
            interfaces: path.resolve(__dirname, 'src/interfaces'),
        }
    }
})


// npm i -D vitest

// crear un archivo "vitest.config"