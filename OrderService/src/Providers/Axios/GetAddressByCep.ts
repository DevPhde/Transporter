import axios from "axios";
import { BadRequestException } from "src/Exceptions/BadRequestException";
import { InternalException } from "src/Exceptions/InternalException";
export interface IViaCepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
}
export async function getAddressByCep(path: string): Promise<IViaCepResponse> {
    try {
        const options = {
            method: 'GET',
            url: `https://viacep.com.br/ws/${path}/json`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const { data } = await axios.request(options);
        return {
            cep: data.cep,
            logradouro: data.logradouro,
            complemento: data.complemento,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf
        }
    } catch (e) {
        if (e.response.status == 400) {
            throw new BadRequestException("CEP Inválido.")
        }
        throw new InternalException("Erro interno. Tente novamente mais tarde.")
    }
}