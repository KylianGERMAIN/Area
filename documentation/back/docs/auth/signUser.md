# Sign User
- [Sign User](#sign-user)
    - [Description](#description)
    - [Success Response](#success-response)
    - [Error Response](#error-response)

**URL**: [/auth/signUser]()

**Method**: `POST`

---

## Description
&emsp;Use to sign a user in firebase with `token`


**Header**

```json
{
  "tokenid": "'Bearer' + tokenId from firebase" : string
}
```

---
## Success Response

**Code**: `200 OK`

**Content**

```json
{
  ".data": {
    "email": "email of the user": string,
    "name": "name of the user": string,
    "uid": "uid of the user": string,
  }
}
```
---
## Error Response

<table>
<tr>
<td> Status </td> <td> Condition </td> <td> Response </td>
</tr>

<tr>
<td> 401 </td>
<td>Bad token</td>
<td>

```json
{
  "msg": "Bad format Token"
     or firebaseError
}
```

</td>
</tr>

<tr>
<td> 500 </td>
<td>If <code>uid</code> is wrong or error in firebase</td>
<td>

```
firebase error
```

</td>
</tr>

</table>
