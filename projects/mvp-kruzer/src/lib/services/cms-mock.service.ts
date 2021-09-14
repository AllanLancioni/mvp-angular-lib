import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { TransferHttpService } from './transfer-http.service';

const configKey = makeStateKey('CONFIG');

export type Obj = { [key: string]: any };

export type MultiLanguageString = {
  enus: string;
  ptbr: string;
  eses: string;
};

export interface Page {
  template: {
    key: string;
    type: {
      key: number;
      label: string;
    };
  };
  urls: string[];
  meta: {
    description: MultiLanguageString;
    keywords: MultiLanguageString;
  };
  attributes: Object;
  active: boolean | 1 | 0;
  category?: any;
  product?: any;
}

@Injectable({
  providedIn: 'root',
})
export class CmsMockService {
  pages: Page[] = [];

  constructor(private http: HttpClient, private httpNGX: TransferHttpService) {}

  async teste(): Promise<any> {
    return await this.http.get('https://pokeapi.co/api/v2/berry').toPromise();
  }

  async teste2(): Promise<any> {
    return await this.httpNGX
      .get('https://pokeapi.co/api/v2/berry')
      .toPromise();
  }

  async getFilters(): Promise<any[]> {
    return [
      {
        label: 'Categorias',
        options: [
          { label: 'Dor e febre', formName: 'dor-febre' },
          { label: 'Limpeza', formName: 'limpeza' },
          { label: 'Autocuidado', formName: 'autocuidado' },
        ],
      },
      {
        label: 'Em destaque',
        options: [
          { label: 'Promoções', formName: 'promotions' },
          { label: 'Lançamentos', formName: 'news' },
          { label: 'Nossos campeões de vendas', formName: 'best-selllers' },
        ],
      },
      {
        label: 'Preço',
        options: [
          { label: 'Até R$ 50,00', formName: 'under-50' },
          { label: 'R$ 50,00 a R$ 150,00', formName: 'between-50-150' },
          { label: 'R$ 150,00 a R$ 300,00', formName: 'between-150-300' },
          { label: 'Mais de R$ 300,00', formName: 'over-300' },
        ],
      },
      {
        label: 'Disponibilidade',
        options: [{ label: 'Somente itens em estoque', formName: 'available' }],
      },
    ];
  }

  async listPages(): Promise<Page[]> {
    return [
      {
        template: {
          key: `TemplateHomeComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`home`, `pagina-inicial`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateMyOcurrencesComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`minha-conta/minhas-ocorrencias`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateMyRatingsComponent`,
          type: {
            key: 8,
            label: `simple`,
          },
        },
        urls: [`minha-conta/minhas-avaliacoes`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {},
        active: 1,
      },
      {
        template: {
          key: `TemplateMySignaturesComponent`,
          type: {
            key: 8,
            label: `simple`,
          },
        },
        urls: [`minha-conta/minhas-assinaturas`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {},
        active: 1,
      },
      {
        template: {
          key: `TemplateAuthComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`auth`, `autenticacao`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateMyOrdersComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`minha-conta/meus-pedidos`, `account/my-orders`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateMyAdressesComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`minha-conta/meus-enderecos`, `account/my-addresses`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateNewAddressComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`minha-conta/novo-endereco`, `account/new-address`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateMyProfileComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`minha-conta/meu-perfil`, `account/my-profile`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateChangeEmailComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`minha-conta/alterar-email`, `account/change-email`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateChangePasswordComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`minha-conta/alterar-senha`, `account/change-password`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateOrderDetailsComponent`,
          type: {
            key: 8,
            label: `simple`,
          },
        },
        urls: [`detalhes-pedido`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {},
        active: 1,
      },
      {
        template: {
          key: `TemplateShoppingCartComponent`,
          type: {
            key: 6,
            label: `simple`,
          },
        },
        urls: [`carrinho`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateProductComponent`,
          type: {
            key: 1,
            label: `simple`,
          },
        },
        urls: [`produto`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste kblo</p>`,
        },
        active: 1,
      },
      {
        template: {
          key: `TemplateProductComponent`,
          type: {
            key: 2,
            label: `product`,
          },
        },
        urls: [`ferdinan`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste ferdinan</p>`,
        },
        active: 1,
        category: null,
        product: {
          _id: '600233834635d30016111432',
          organization: '5f7231fe7e493b5e07cf98ea',
          createdAt: '2021-01-16T00:29:56.422Z',
          updatedAt: '2021-02-02T22:38:27.422Z',
          deleted: false,
          group: '6001150106ff0c3ba8aac91a',
          brand: '600122ba638d92137c399abb',
          category: '6001321d7a3935013e0f7097',
          name: 'AAS adulto com 10 comprimidos',
          measurementUnit: '60009b6fa8b043e8f97138c2',
          isActive: true,
          originalName: 'A A S AD 500MG 10CPR',
          tenant: '5f7231fe7e493b5e07cf98ea',
          description: 'product description',
          identifiers: {
            oracle: '1',
          },
          status: '',
          isVisible: false,
          showWithoutStock: true,
          metaDescription: null,
          metaKeywords: null,
          attributes: {
            eans: ['1130009950110', '7897595900579'],
            instructions: [''],
            idVtexBrand: 1314023,
            idVtexCategory: '221851',
            marca: 'SANOFI',
            marcaId: '1314023',
            marcaGc: 'A A S',
            apresentacao: 'AVULSO',
            departamentoWeb: 'MEDICAMENTOS.DOR E FEBRE.DOR DE CABECA',
            departamentoWebId: '221851',
            eanQuantidadeEmbalagem: '50',
            categoriaProduto: 'ANALGESICO E ANTITERMICO',
            codigoCest: '1300300',
            comercializavel: true,
            comprador: 'LEANDRO RIZZO',
            controleRastreabilidade: false,
            dataHoraInclusao: '2017-10-27T22:39:41.000Z',
            dataHoraUltimaAlteracao: '2021-01-12T20:17:29.000Z',
            dataInclusao: '2017-10-27T22:39:41.000Z',
            dimensaoAlt: 75,
            dimensaoCom: 45,
            dimensaoLag: 45,
            dimensaoUniMedida: 'MILIMETRO',
            dosagem: '500MG',
            eanPrincipal: true,
            fabricanteCnpj: 'SANOFI MEDLEY FARMACEUTICA LTDA',
            grupoProduto: 'DOR E FEBRE',
            isSpecialty: false,
            isSequencial: 24246,
            indiceIbpt: '31.45',
            ncm: '30049024',
            peso: 0.05,
            registroMs: '1130009950110',
            secaoProduto: 'OTC AVULSO',
            situacaoEstadual: '060',
            statusCompra: true,
            statusItem: 'Active',
            statusVenda: true,
            subgrupoProduto: 'DOR DE CABECA',
            isComission: false,
            subCategoria: 'REFERENCIA',
            tipoSecao: 'MEDICAMENTOS',
            unidadeMedida: 'UN',
            retencaoReceita: false,
            requerCrm: false,
            vendaControlada: false,
            tipoMedicamento: '0',
            sazonalidade: 'INVERNO',
            termolabil: false,
            usoConsumo: false,
            listaPnu: 'NEGATIVA - MONOFASICO',
            farmaciaPopular: false,
            embalagemIndustria: '10',
            quantidadeApresentacao: '10',
            principioAtivo: 'ACIDO ACETILSALICILICO',
            origem: '0',
            unidade_medida_fracionado: 'CPM',
            textLink: 'AAS-adulto-com-10-comprimidos',
            isDraw: false,
            isGift: false,
          },
          tags: [],
          eans: ['1130009950110', '7897595900579'],
          ean: '1130009950110',
          dimensions: {
            cubicWeight: '0.000152',
            height: '7.5',
            weight: '0.05',
            width: '4.5',
            measurementUnit: '60009b6fa8b043e8f97138c2',
            length: '4.5',
          },
          commercialName: 'A A S',
          code: '1',
          sku: [
            {
              _id: '600233834635d30016111433',
              organization: '5f7231fe7e493b5e07cf98ea',
              createdAt: '2021-01-16T00:29:56.843Z',
              updatedAt: '2021-02-17T17:08:07.076Z',
              deleted: false,
              name: 'AAS adulto com 10 comprimidos',
              ean: '1130009950110',
              description: null,
              tenant: '5f7231fe7e493b5e07cf98ea',
              originalName: 'A A S AD 500MG 10CPR',
              shortDescription: 'A A S AD 500MG 10CPR',
              identifiers: {
                oracle: '1',
              },
              status: '',
              isActive: true,
              isVisible: false,
              metaDescription: null,
              metaKeywords: null,
              attributes: {
                instructions: [''],
                idVtexBrand: 1314023,
                idVtexCategory: '221851',
                marca: 'SANOFI',
                marcaId: '1314023',
                marcaGc: 'A A S',
                apresentacao: 'AVULSO',
                venancioWeb: null,
                departamentoWeb: 'MEDICAMENTOS.DOR E FEBRE.DOR DE CABECA',
                departamentoWebId: '221851',
                agrupamentoWeb: null,
                agrupamentoWebId: null,
                eanQuantidadeEmbalagem: '50',
                categoriaProduto: 'ANALGESICO E ANTITERMICO',
                classeTerapeutica: null,
                codigoCest: '1300300',
                comercializavel: true,
                comprador: 'LEANDRO RIZZO',
                controleRastreabilidade: false,
                dataForaLinha: null,
                dataHoraInclusao: '2017-10-27T22:39:41.000Z',
                dataHoraUltimaAlteracao: '2021-01-12T20:17:29.000Z',
                dataInclusao: '2017-10-27T22:39:41.000Z',
                dimensaoAlt: 75,
                dimensaoCom: 45,
                dimensaoLag: 45,
                dimensaoUniMedida: 'MILIMETRO',
                dosagem: '500MG',
                eanPrincipal: true,
                embalagemPadrao: null,
                envioDataHora: null,
                envioErro: null,
                envioStatus: null,
                fabricacaoPropria: null,
                fabricanteCnpj: 'SANOFI MEDLEY FARMACEUTICA LTDA',
                grupoProduto: 'DOR E FEBRE',
                isSpecialty: false,
                icmsDesonerado: null,
                idCampanha: null,
                isSequencial: 24246,
                indiceIbpt: '31.45',
                informacaoDun: null,
                livroPortaria344: null,
                minMultCompra: null,
                motivoIsencaoMs: null,
                ncm: '30049024',
                ncmIcms: null,
                ncmIpi: null,
                pacoteProduto: null,
                pbm: null,
                peso: 0.05,
                produtoUsoContinuo: null,
                registroMs: '1130009950110',
                secaoProduto: 'OTC AVULSO',
                situacaoEstadual: '060',
                statusCompra: true,
                statusItem: 'Active',
                statusVenda: true,
                subgrupoProduto: 'DOR DE CABECA',
                isComission: false,
                subCategoria: 'REFERENCIA',
                tipoReposicao: null,
                tipoSecao: 'MEDICAMENTOS',
                unidadeMedida: 'UN',
                retencaoReceita: false,
                tipoReceita: null,
                requerCrm: false,
                vendaControlada: false,
                tipoMedicamento: '0',
                sazonalidade: 'INVERNO',
                termolabil: false,
                usoConsumo: false,
                listaPnu: 'NEGATIVA - MONOFASICO',
                farmaciaPopular: false,
                embalagemIndustria: '10',
                quantidadeApresentacao: '10',
                principioAtivo: 'ACIDO ACETILSALICILICO',
                origem: '0',
                unidade_medida_fracionado: 'CPM',
                textLink: 'AAS-adulto-com-10-comprimidos',
                highValue: false,
                maxInstallments: 0,
                maxSaleQuantity: 0,
                isGift: false,
                isDraw: false,
                gifts: [],
                hasGift: false,
              },
              tags: [],
              dimensions: {
                cubicWeight: '0.000152',
                height: '7.5',
                weight: '0.05',
                width: '4.5',
                measurementUnit: '60009b6fa8b043e8f97138c2',
                length: '4.5',
              },
              product: '600233834635d30016111432',
              image: '/skus/sem_imagem_medicamentos.jpg',
              commercialName: 'A A S',
              code: '1',
              delivery: {
                modalities: [],
              },
            },
          ],
        },
      },
      {
        template: {
          key: `TemplateCategoryComponent`,
          type: {
            key: 3,
            label: `category`,
          },
        },
        urls: [`category`],
        meta: {
          description: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
          keywords: {
            enus: ``,
            ptbr: ``,
            eses: ``,
          },
        },
        attributes: {
          bloco1: `<p>teste saka</p>`,
        },
        active: 1,
        product: null,
        category: {
          _id: '6001321d7a3935013e0f7096',
          organization: '5f7231fe7e493b5e07cf98ea',
          createdAt: '2021-01-15T06:11:41.842Z',
          updatedAt: '2021-01-15T06:11:59.446Z',
          deleted: false,
          name: 'Dor E Febre',
          originalName: 'DOR E FEBRE',
          identifiers: {
            oracle: 'Z',
          },
          isActive: true,
          parent: '6001321d7a3935013e0f7095',
          isRoot: false,
          code: 'MEDICAMENTOS_DOR E FEBRE',
          level: 2,
        },
      },
    ];
  }

  async getProducts(): Promise<any[]> {
    return [
      {
        name: 'Kit Super Reposição',
        price: 39.9,
        image:
          'https://positiva.cdn.plataformaneo.com.br/produto/20200909112707_5496994504_D.png',
        rating: 4,
        times: '3',
        timesPrice: 13.33,
        qtd: 1,
        off: 5,
      },
      {
        name: 'Lava Roupas 5L',
        price: 299.99,
        image:
          'https://positiva.cdn.plataformaneo.com.br/produto/20201203135902_5593994407_H.jpg',
        rating: 3,
        times: '3',
        timesPrice: 76.66,
        qtd: 1,
        off: 15,
      },
      {
        name: 'Kit Super Reposição',
        price: 39.9,
        image:
          'https://positiva.cdn.plataformaneo.com.br/produto/20200909112707_5496994504_D.png',
        rating: 1,
        times: '3',
        timesPrice: 13.33,
        qtd: 1,
      },
      {
        name: 'Lava Roupas 5L',
        price: 299.99,
        image:
          'https://positiva.cdn.plataformaneo.com.br/produto/20201203135902_5593994407_H.jpg',
        rating: 2,
        times: '3',
        timesPrice: 76.66,
        qtd: 1,
        off: 15,
      },
    ];
  }

  async getProduct(): Promise<any> {
    return {
      name: 'ÓLEO HIDRATANTE DE COCO 90g',
      price: '32,99',
      rating: 5,
      img: [
        {
          id: 1,
          alt: 'Imagem 1',
          src:
            'https://positiva.cdn.plataformaneo.com.br/produto/20201203135902_5593994407_D.jpg',
          sequence: 0,
        },
        {
          id: 2,
          alt: 'Imagem 2',
          src:
            'https://positiva.cdn.plataformaneo.com.br/produto/20200909112707_5496994504_D.png',
          sequence: 1,
        },
        {
          id: 3,
          alt: 'Imagem 3',
          src:
            'https://positiva.cdn.plataformaneo.com.br/produto/20200816004147_4146995854_D.png',
          sequence: 2,
        },
      ],
      benefitsTitle: 'O Óleo de Coco mais incrível que você já viu!',
      benefits: [
        '100% puro e natural;',
        'Extra-virgem (prensado a frio);',
        'Textura super inovadora (leia mais ao longo da página!);',
        'Cultivado de forma sustentável sem uso de agrotóxicos, respeitando o meio ambiente;',
        'Excelente emoliente para hidratar a pele do corpo, rosto e lábios;',
        'Indicado para tratar cabelos ressecados e desvitalizados;',
        'Ótimo anti-frizz;',
        'Rico em vitamina E, um antioxidante natural;',
        'Vegano;',
        'Livre de  parabenos, sulfatos, corantes, silicone e essências artificiais',
      ],
      description: `<h4>Muito diferente dos óleos de coco que você já viu!</h4>
      <p>
        Além de ser puríssimo e contar com todos os benefícios de um óleo de
        coco extra-virgem (prensado a frio, que preserva as propriedades e
        benefícios), o Óleo de Coco da Positiv.a tem uma textura leve e única,
        quase um creme: isso porque ele passa por um processo mecânico chamado
        micronização, que usa ar comprimido e água para emulsificar e diminuir
        as partículas do óleo, transformando-o em uma emulsão super hidratante,
        nutritiva e que mantém a pureza do coco. Tudo isso feito com apenas 3
        ingredientes naturais! É natureza aliada à tecnologia :D
      </p>
      <p>
        Com essa consistência cremosa, fica mais fácil aplicar no corpo e no
        cabelos, e ainda não corre o risco de ora o produto estar líquido, ora
        pastoso, de acordo com a temperatura do ambiente (variação normal em
        óleos de coco comuns).
      </p>
      <p>
        Vem em lata de alumínio de produção nacional (São Paulo) serigrafada,
        facilitando o processo de reciclagem.
      </p>
      <div><span>Como usar</span></div>
      <p>
        Na pele: Para ter os benefícios desejados basta massagear suavemente o
        corpo após o banho ou sempre que sentira necessidade de hidratação. Para
        facilitar a aplicação, usar após o banho com o corpo ainda molhado e
        enxugar a pele suavemente com uma toalha.
      </p>
      <p>
        No cabelo: Aplicar em todo o comprimento do fio (para cabelos oleosos,
        manter distância de um palmo da raiz). Por ter propriedades
        antioxidantes, ajuda a criar resistência, amenizando a quebra dos fios.
        Aplicar, deixar agir 20 minutos e lavar com água em temperatura fria ou
        morna. Secar naturalmente.
      </p>
      <p>
        Como máscara facial: Aplicar o óleo de coco no rosto, massagear com
        movimentos circulares por 2 minutos. Retirar com água. Para pele for
        oleosa, basta retirar com um sabonete natural. Dica: aplicar à noite e
        retirar apenas pela manhã.
      </p>`,
    };
  }

  async getMenu(): Promise<any[]> {
    return [
      {
        label: 'Promoções e kits',
      },
      {
        label: 'Limpeza',
        submenu: [
          { label: 'Cuidado para casa' },
          { label: 'Cuidado para roupas' },
          { label: 'Cuidado para cozinha' },
          { label: 'Acessórios de limpeza' },
          { label: 'Kits' },
          { label: 'Todos os itens' },
        ],
      },
      {
        label: 'Autocuidado',
        submenu: [
          { label: 'Pele' },
          { label: 'Cabelos' },
          { label: 'Saúde bucal' },
          { label: 'Aromaterapia' },
          { label: 'Acessórios' },
          { label: 'Kits' },
          { label: 'Todos os itens' },
        ],
      },
      { label: 'Todos os produtos' },
    ];
  }

  async getPageByUrl(url: string): Promise<Page> {
    const pages = await this.listPages();
    const found = pages.find((p: any) => p.urls.some((u: any) => u == url));
    if (!found) {
      throw new Error('Falha ao buscar página!');
    }
    return found;
  }
}
