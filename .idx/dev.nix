{ pkgs, ... }:

{
  # enable previews and point IDX at your dev command
  idx.previews = {
    enable = true;
    previews = {
      web = {
        manager = "web";                     # tells IDX it's a web preview
        command = [ "npm" "run" "dev" ];     # your dev server
        env = {
          PORT = "$PORT";                    # use IDX’s injected $PORT
        };
      };
    };
  };
}