using BazzucaMedia.DTO.SocialNetwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaMedia.Domain.Interfaces.Services
{
    public interface IXTokenService
    {
        Task<OAuthTokenInfo> GetRequestTokenAsync();
        string GetAuthorizeUrl(string oauthToken);
        Task<OAuthTokenInfo> GetAccessTokenAsync(string oauthToken, string oauthVerifier);
        Task<OAuthTokenInfo> RunUserAuthorizationFlowAsync();
    }
}
