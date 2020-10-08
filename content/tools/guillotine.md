---
title: "Guillotine"
date: 2020-10-06T14:25:04-03:00
draft: false
toc: false
images:
tags:
  - untagged

---


Guillotine - HTTP Security Headers Finder



##### Finds the security headers that are not enabled in a specific domain.


```
gohanckz@R3D734M:/opt/scanning/guillotine$ ./guillotine.py -t https://www.example.com
                                         
         |\____/|,      _                
         |      | \    {\,              
         |      |  `,__.'\`              
      ___|______|____', :__.           
    /    | (__) |       / `,  `.         
   /     !______|       L\J'    `.       
  :_______________________________i.     
  |  GUILLOTINE                    |     
  |      By Gohanckz               |     
  !___________W0lf_F4ng____________! DATE:2020-10-06 16:59:56.615314
+-----------------------------------+---------------------------------------+
| [+]   ENABLED SECURITY HEADERS    | [x]     MISSING SECURITY HEADERS      |
+-----------------------------------+---------------------------------------+
| Expect-CT                         | Public-Key-Pins-Report-Only           |
| X-XSS-Protection                  | Content-Security-Policy               |
| X-Frame-Options                   | X-Powered-By                          |
| X-Content-Type-Options            | Strict-Transport-Security             |
|                                   | Feature-Policy                        |
|                                   | Content-Security-Policy-Report-Only   |
|                                   | Public-Key-Pins                       |
|                                   | Referrer-Policy                       |
|                                   | X-Permitted-Cross-Domain              |
|                                   | Upgrate-Insecure-Requests             |
+-----------------------------------+---------------------------------------+

```

### HTTP Security Headers List

you can detect the following HTTP security headers:

* Strict-Transport-Security
* X-XSS-Protection
* X-Content-Type-Options
* X-Frame-Options
* Content-Security-Policy
* Public-Key-Pins
* X-Permitted-Cross-Domain
* Referrer-Policy
* Expect-CT
* Feature-Policy
* Content-Security-Policy-Report-Only
* Expect-CT
* Public-Key-Pins-Report-Only
* Upgrate-Insecure-Requests
* X-Powered-By

**note:** you can add security headers by directly modifying the code.

### Clone the repository

```
git clone https://github.com/Gohanckz/guillotine.git
```

### INSTALL

```
pip install -r requirements.txt
```

### USAGE

The use is very simple.

```
python guillotine.py -t https://www.domain.com
```



DEVELOPED| CONTACT | VERSION
----------|---------|-------
Gohanckz |gohanckz@lesand.cl | 1.0
W0lf_F4ng|ms@w0lff4ng.org| 1.0
