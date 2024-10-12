{
    description = "Telecloud Developer Shell";

    inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    inputs.flake-utils.url = "github:numtide/flake-utils";

    outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
        let
            pkgs = nixpkgs.legacyPackages.${system};
        in {
            devShells.default = pkgs.mkShell {
                nativeBuildInputs = with pkgs; [ openssl nodejs yarn nodePackages.ts-node ];
                env = {
                    PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
                    PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
                    PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
                };
                shellHook = ''
                    export PATH=$PATH:$PWD/node_modules/.bin
                '';
            };
        }
    );
}