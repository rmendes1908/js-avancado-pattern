import { fetchHandle } from "../util/fetch-helper.js";
import { partialize, pipe } from "../util/operators.js";
import { Maybe } from "../util/Maybe.js";

const ApiUrl = 'http://localhost:3000/notas';

const groupItens = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filtraByCodigo = (codigo, notasM) => notasM.map(notas => notas.filter((item) => item.codigo == codigo));
const totaliza = notasM => notasM.map(notas => notas.reduce((total, item)  => total + item.valor, 0));

export const NotaService = {

    listAll(){

        return fetch(ApiUrl)
            .then(fetchHandle)
            .then(notas => Maybe.of(notas))
            .catch(err => {
                console.log(err);
                return Promise.reject('Não foi possivel listar as notas ficais');
            });

    },

    somaItens(codigo){

        const filtraByCodigoPartial = partialize(filtraByCodigo, codigo);

        const somaItens = pipe(
            groupItens,
            filtraByCodigoPartial,
            totaliza
        );

        return this.listAll()
            .then(somaItens)
            .then(result => result.getOrElse(0));

    }
    
}