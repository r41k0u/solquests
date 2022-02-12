Commands executed :

```cargo install spl-token-cli```

I already had a solana wallet. I airdropped Sol on the devnet using the commands:

```solana airdrop 1 8L2i9gYVHGjoEtCWSvLcbmdbeHTx6GwYBWsAxWHD51KR --url https://api.devnet.solana.com```

checking balance:

```solana balance --url https://api.devnet.solana.com```

Made sure the solana config has the RPC URL and Websocket URL as devnet.

then:

```spl-token create-token```

Output:

```Creating token Fx5NadB3UR8jTFj9aT3uQ81HfywNsUsU5frkrVz3VcWw```

```Signature: aupdytvLjAoq4QGmz5iSR6jcfVQcXHFXNwBJwkFzqDhbVp2J98Ki8KLad2RDgNh7Bif7QF3MTG3nWDc5W81fvvA```

Used this token address to create token account:

```spl-token create-account Fx5NadB3UR8jTFj9aT3uQ81HfywNsUsU5frkrVz3VcWw --url https://api.devnet.solana.com```

Output:

```Creating account 5NjmWaH9S9gWMVPcmgahSCrSVGNPtq7UXNEXm8sSk523```

```Signature: 5T6ZXL5t931GHGmZkBEydKhxatQ4XPNWJPhs6utaTYUkwwTjj5SLGK5wKtrvhjAHESYwBWEVoGTEHj6BCdBPzcmV```

Minting 100 tokens:

```spl-token mint Fx5NadB3UR8jTFj9aT3uQ81HfywNsUsU5frkrVz3VcWw 100```

checking token balance:

```spl-token balance Fx5NadB3UR8jTFj9aT3uQ81HfywNsUsU5frkrVz3VcWw --url https://api.devnet.solana.com```

Disabling mint:

```spl-token authorize Fx5NadB3UR8jTFj9aT3uQ81HfywNsUsU5frkrVz3VcWw mint --disable```

Burning 20 Tokens in holding account:

```spl-token burn 5NjmWaH9S9gWMVPcmgahSCrSVGNPtq7UXNEXm8sSk523 20```

Checking tokens in circulation:

```spl-token supply Fx5NadB3UR8jTFj9aT3uQ81HfywNsUsU5frkrVz3VcWw```

Which returns 80

Now that the token is created and minted, it can be transferred to any other account using ```spl-token transfer```. To name my token, I'll have to send a PR to solana-labs/token-list.
