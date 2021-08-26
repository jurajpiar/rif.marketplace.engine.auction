import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "hardhat-watcher";
import "tsconfig-paths/register";


const config: HardhatUserConfig = {
  // Your type-safe config goes here
  solidity: '0.8.4',
  watcher: {
    test: {
      tasks: [
        // { command: 'compile', params: { testFiles: ['{path}'] } },
        { command: 'test', params: { testFiles: ['{path}'] } }
      ],
      files: ['./test/**/*', './contracts/**/*'],
      verbose: true
    }
  }
};

export default config;