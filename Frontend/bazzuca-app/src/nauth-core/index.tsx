import { createContext, ReactNode } from 'react';

export interface ProviderResult {
  sucesso: boolean;
  mensagemErro?: string;
  mensagemSucesso?: string;
  dataResult?: any;
}

export interface IAuthProvider {
  sessionInfo: any;
  login?: (username: string, password: string) => Promise<ProviderResult>;
  logout?: () => void;
}

export const AuthContext = createContext<IAuthProvider | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export function UserProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ContextBuilder(
  providers: Array<React.ComponentType<{ children: ReactNode }>>
) {
  return function ContextContainer({ children }: { children: ReactNode }) {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
  };
}

export interface AuthSession {
  token: string;
  name?: string;
}

export interface BusinessResult<T> {
  sucesso: boolean;
  mensagem?: string;
  dataResult?: T;
}

class AuthBusinessClass {
  private session: AuthSession | null = null;
  getSession(): AuthSession | null {
    return this.session;
  }
  setSession(session: AuthSession | null) {
    this.session = session;
  }
}

export const AuthFactory = {
  AuthBusiness: new AuthBusinessClass(),
};


export interface StatusRequest {
  sucesso: boolean;
  mensagem?: string;
}

export interface IHttpClient {
  doGetAuth<T>(url: string, token: string): Promise<T>;
  doPostAuth<T>(url: string, data: any, token: string): Promise<T>;
  doPutAuth<T>(url: string, data: any, token: string): Promise<T>;
}


export interface HttpClientInstance extends IHttpClient {
  init(url: string): void;
  setLogoff(cb: () => void): void;
}

export function HttpClient(): HttpClientInstance {
  let base = '';
  let logoff: () => void = () => {};
  return {
    init(url: string) { base = url; },
    setLogoff(cb: () => void) { logoff = cb; },
    async doGetAuth<T>(url: string, token: string) {
      const res = await fetch(base + url, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) logoff();
      return res.json() as Promise<T>;
    },
    async doPostAuth<T>(url: string, data: any, token: string) {
      const res = await fetch(base + url, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });
      if (res.status === 401) logoff();
      return res.json() as Promise<T>;
    },
    async doPutAuth<T>(url: string, data: any, token: string) {
      const res = await fetch(base + url, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });
      if (res.status === 401) logoff();
      return res.json() as Promise<T>;
    },
  };
}
