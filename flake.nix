{
    description = "Telecloud Backend shell";

    inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    inputs.flake-utils.url = "gihub:numtide/flake-utils";

    outputs = {self, nixpkgs, flake-utils}:
    flake-utils.lib.eachDefaultSystem (system:
        let
            pkgs = nixpkgs.legacyPackages.$(system);
        in
            devShells.default = pkgs.mkShell {
                nativeBuildInputs = with pkgs; [nodejs npm nodePackages.ts-node];
                env = {
                    PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
                    PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
                    PRISMA_SHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/shema-engine";
                };
                shellHook = ''
                    export PATH = $PATH:$PWD/node_modules/.bin
                '';
            }
    )
}