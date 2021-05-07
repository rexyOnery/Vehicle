using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Vehicle.Services
{
    public class ForgotRepo
    {
        
        internal static async Task<string> ConfirmCode(string email, string code)
        {
            HttpClient webClient = new HttpClient();
            var url = "https://lockuptag.com/api/users/confirmcode/?email=" + email + "&code=" + code;
            UriBuilder fullUri = new UriBuilder(url);

            if (!string.IsNullOrEmpty(code))
                fullUri.Query = code;

            HttpClient client = new HttpClient();
            var stringContent = new StringContent(email);
            var response = await webClient.PostAsync(url, stringContent);
            //HttpResponseMessage response = await client.PostAsync(new Uri(url), stringContent);

            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            //response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            return responseBody;
        }

        internal static async Task<string> PasswordChange(string email, string password)
        {
            HttpClient webClient = new HttpClient();
            var url = "https://medicallng.com/api/users/passwordchange/?email=" + email + "&password=" + password;
            UriBuilder fullUri = new UriBuilder(url);

            if (!string.IsNullOrEmpty(password))
                fullUri.Query = password;

            HttpClient client = new HttpClient();
            var stringContent = new StringContent(email);
            var response = await webClient.PutAsync(url, stringContent);
            //HttpResponseMessage response = await client.PostAsync(new Uri(url), stringContent);

            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            //response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            return responseBody;
        }
    }
}
